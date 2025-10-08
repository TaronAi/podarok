import { GoogleGenAI, Type } from "@google/genai";
import type { QuizAnswers, GiftIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        gifts: {
            type: Type.ARRAY,
            description: "An array of 10 gift ideas in Russian.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: "The name of the gift idea in Russian."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A short, appealing description of the gift in Russian (2-3 sentences)."
                    },
                    priceRange: {
                        type: Type.STRING,
                        description: "The estimated price range in RUB (e.g., '3000 - 5000₽')."
                    },
                    searchKeywords: {
                        type: Type.STRING,
                        description: "A concise search query string in Russian to find this item or category on marketplaces."
                    }
                },
                required: ['name', 'description', 'priceRange', 'searchKeywords']
            }
        }
    },
    required: ['gifts']
};

function interpretAnswers(answers: QuizAnswers): string {
    let interpretation = "Вот краткое описание интересов человека, основанное на ответах:\n";

    if (answers.lifestyle) {
        if (answers.lifestyle.includes('в лесу')) interpretation += "- Ценит уют, природу и спокойствие. Возможно, любит читать, готовить или заниматься ручным творчеством.\n";
        if (answers.lifestyle.includes('в центре города')) interpretation += "- Любит динамику, современное искусство, технологии и общение. Ценит удобство и доступность развлечений.\n";
        if (answers.lifestyle.includes('загородный дом')) interpretation += "- Семейный человек, ценит комфорт, природу и домашние посиделки. Возможно, увлекается садоводством или настольными играми.\n";
        if (answers.lifestyle.includes('лофт')) interpretation += "- Творческая личность, ценит стиль, минимализм и уникальные вещи. Интересуется дизайном, музыкой или искусством.\n";
    }

    if (answers.vacation) {
        if (answers.vacation.includes('в горах')) interpretation += "- Активный и энергичный человек. Увлекается спортом, походами, путешествиями и приключениями.\n";
        if (answers.vacation.includes('у океана')) interpretation += "- Любит расслабление, комфорт и заботу о себе. Ценит красоту и гедонизм.\n";
        if (answers.vacation.includes('в мегаполисе')) interpretation += "- Любознательный, интересуется историей, искусством, гастрономией и новыми впечатлениями.\n";
        if (answers.vacation.includes('на природе')) interpretation += "- Интроверт, ценит тишину, медитацию, чтение. Возможно, увлекается йогой, рыбалкой или фотографией.\n";
    }

    return interpretation;
}


export async function generateGiftIdeas(answers: QuizAnswers): Promise<GiftIdea[]> {
    const interpretation = interpretAnswers(answers);
    const prompt = `
        Я ищу идеи для подарка со следующими критериями:
        - Для кого: ${answers.recipient || 'не указано'}
        - Повод: ${answers.occasion || 'не указано'}
        - Возраст: ${answers.age || 'не указано'}
        - Бюджет: ${answers.budget || 'не указано'}
        - Тип подарка: ${answers.giftType || 'любой'}
        - Дополнительные пожелания: ${answers.interests || 'нет'}

        ${interpretation}

        Пожалуйста, сгенерируй 10 разнообразных и креативных идей для подарка на русском языке. Учитывай все предоставленные критерии и интерпретацию характера. Включи физические товары, цифровые подарки и впечатления, если это уместно. Ответ должен быть в формате JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are an expert AI assistant specializing in finding the perfect gift ideas for the Russian market. You should provide creative and thoughtful suggestions based on a personality profile. For each idea, provide a short, appealing description, a realistic price range in Russian Rubles (RUB), and generate search query keywords suitable for Ozon, Wildberries, and Yandex.Market. Respond only in JSON that conforms to the provided schema.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (result && result.gifts && Array.isArray(result.gifts)) {
            // Add a unique ID to each gift for client-side state management
            return result.gifts.map((gift: Omit<GiftIdea, 'id'>) => ({
                ...gift,
                id: crypto.randomUUID(),
            }));
        } else {
            throw new Error("Invalid response format from API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate gift ideas.");
    }
}