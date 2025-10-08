import React from 'react';

const BlogPage: React.FC = () => {
    const articles = [
        "Топ 10 подарков для него (2025)",
        "Лучшие подарки на именины в России",
        "Креативные подарки на день рождения до 3000₽",
        "Что подарить коллеге на Новый год?",
        "Идеи подарков для геймеров: от гаджетов до мерча",
        "Подарки-впечатления, которые запомнятся надолго"
    ];

    return (
        <div className="animate-fade-in-slow max-w-3xl mx-auto">
             <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Блог и Идеи Подарков 📚</h1>
                <p className="text-lg text-slate-400">Наши подборки и статьи, чтобы вдохновить вас.</p>
            </div>
            
            <div className="space-y-6">
                <div className="text-center bg-yellow-200/20 border border-yellow-400/50 text-yellow-200 p-4 rounded-lg">
                    <p className="font-bold">Страница в разработке!</p>
                    <p>Скоро здесь появятся полезные статьи и подборки подарков. Следите за обновлениями!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((title, index) => (
                        <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 className="text-xl font-bold text-pink-400">{title}</h2>
                            <p className="text-slate-400 mt-2">Краткое описание статьи будет здесь. Расскажем о лучших идеях и дадим полезные советы...</p>
                            <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold mt-4 inline-block">Читать далее &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
