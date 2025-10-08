import type { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        key: 'recipient',
        text: 'Для кого вы ищете подарок?',
        subtext: '(Who are you looking for a gift for?)',
        type: 'options',
        options: ['Друг (Friend)', 'Коллега (Colleague)', 'Член семьи (Family)', 'Партнер (Partner)'],
    },
    {
        key: 'occasion',
        text: 'Какой повод для подарка?',
        subtext: '(What is the occasion?)',
        type: 'options',
        options: ['День рождения', 'Новый год', '8 Марта', '23 Февраля', 'Годовщина', 'Просто так'],
    },
     {
        key: 'age',
        text: 'Укажите возраст получателя',
        subtext: '(Specify the recipient\'s age)',
        type: 'options',
        options: ['Подросток (12-17)', 'Молодой взрослый (18-25)', 'Взрослый (26-40)', 'Зрелый (41+)'],
    },
    {
        key: 'budget',
        text: 'Какой у вас бюджет?',
        subtext: '(What is your budget?)',
        type: 'options',
        options: ['до 1000₽', '1000-3000₽', '3000-7000₽', '7000-15000₽', '15000₽+'],
    },
    {
        key: 'lifestyle',
        text: 'Какой дом описывает их лучше всего?',
        subtext: '(Which house describes them best?)',
        type: 'image-options',
        options: [
            { text: 'Уютный домик в лесу', imageUrl: 'https://images.unsplash.com/photo-1504615958639-6e6a18a85c7b?w=600&q=80' },
            { text: 'Современная квартира в центре города', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80' },
            { text: 'Просторный загородный дом для семьи', imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80' },
            { text: 'Минималистичный лофт', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
        ],
    },
    {
        key: 'vacation',
        text: 'Идеальный отпуск для них — это...',
        subtext: '(Their ideal vacation is...)',
        type: 'image-options',
        options: [
            { text: 'Активный отдых в горах', imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80' },
            { text: 'Пляжный релакс у океана', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723a996f329?w=600&q=80' },
            { text: 'Исследование культуры в мегаполисе', imageUrl: 'https://images.unsplash.com/photo-1505993596828-56276b3e2101?w=600&q=80' },
            { text: 'Спокойствие и уединение на природе', imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80' },
        ],
    },
     {
        key: 'giftType',
        text: 'Какой тип подарка вы рассматриваете?',
        subtext: '(Выберите один или несколько)',
        type: 'multiselect',
        options: ['Физический подарок', 'Онлайн/Цифровой', 'Впечатление (сертификат)'],
    },
    {
        key: 'interests',
        text: 'Есть что-то еще важное, что стоит учесть?',
        subtext: '(Необязательно)',
        type: 'text',
        placeholder: 'Например: коллекционирует винил, фанат Звездных Войн...',
    },
];
