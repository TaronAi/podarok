import React from 'react';

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-4 text-xl font-bold">
            {number}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

const HomePage: React.FC = () => {
    return (
        <div className="animate-fade-in-slow text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                Найдите идеальный подарок <br /> за <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">60 секунд</span> с ИИ 🎁
            </h1>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 mb-8">
                Ответьте на несколько простых вопросов, и наш искусственный интеллект подберет для вас уникальные и персональные идеи подарков с ссылками на популярные маркетплейсы.
            </p>
            <a
                href="#quiz"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg py-4 px-10 rounded-lg transition-transform duration-300 transform hover:scale-105"
            >
                Начать поиск подарка
            </a>

            <div className="mt-20 md:mt-28">
                <h2 className="text-3xl font-bold mb-10">Как это работает?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <StepCard 
                        number="1"
                        title="Пройдите квиз"
                        description="Ответьте на несколько вопросов о получателе, поводе и ваших предпочтениях."
                    />
                    <StepCard 
                        number="2"
                        title="Получите идеи"
                        description="Наш ИИ проанализирует ответы и сгенерирует список персональных рекомендаций."
                    />
                     <StepCard 
                        number="3"
                        title="Выберите и купите"
                        description="Изучите предложенные варианты и переходите к покупке на Ozon, Wildberries или Я.Маркет."
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
