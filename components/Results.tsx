import React, { useState } from 'react';
import type { GiftIdea } from '../types';
import GiftCard from './GiftCard';

interface ResultsProps {
    ideas: GiftIdea[];
    onRestart: () => void;
    onReload: () => void;
    isReloading: boolean;
    wishlist: GiftIdea[];
    onToggleWishlist: (idea: GiftIdea) => void;
    isIdeaInWishlist: (id: string) => boolean;
    error: string | null;
}

const ReloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4a12 12 0 0116 16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 4a12 12 0 01-16 16" />
    </svg>
);


const Results: React.FC<ResultsProps> = ({ ideas, onRestart, onReload, isReloading, wishlist, onToggleWishlist, isIdeaInWishlist, error }) => {
    const [filter, setFilter] = useState<'all' | 'wishlist'>('all');

    const wishlistIdeasInCurrentResults = ideas.filter(idea => isIdeaInWishlist(idea.id));
    const displayedIdeas = filter === 'all' ? ideas : wishlistIdeasInCurrentResults;

    return (
        <div className="w-full animate-fade-in-slow">
            <h2 className="text-3xl font-bold text-center mb-2">Ваши персональные идеи для подарка!</h2>
            <p className="text-slate-400 text-center mb-6">Сохраняйте понравившиеся идеи в вишлист ❤️</p>
            
            {error && <p className="text-center text-red-400 mb-4">{error}</p>}

            <div className="flex justify-center gap-4 mb-6">
                 <button
                    onClick={() => setFilter('all')}
                    className={`px-5 py-2 rounded-lg font-semibold transition-colors ${filter === 'all' ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    Все идеи ({ideas.length})
                </button>
                <button
                    onClick={() => setFilter('wishlist')}
                    className={`px-5 py-2 rounded-lg font-semibold transition-colors ${filter === 'wishlist' ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    В вишлисте ({wishlistIdeasInCurrentResults.length})
                </button>
            </div>

            <div className="space-y-4">
                {displayedIdeas.length > 0 ? (
                    displayedIdeas.map((idea) => (
                        <GiftCard 
                            key={idea.id} 
                            idea={idea} 
                            isInWishlist={isIdeaInWishlist(idea.id)}
                            onToggleWishlist={() => onToggleWishlist(idea)}
                        />
                    ))
                ) : (
                    <div className="text-center bg-slate-800 p-8 rounded-lg">
                        <p className="text-slate-300">{filter === 'wishlist' ? 'В этой подборке нет сохраненных идей. Просмотрите все идеи или перейдите на страницу вишлиста.' : 'Не удалось найти идеи. Попробуйте изменить критерии.'}</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button
                    onClick={onRestart}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 w-full sm:w-auto"
                >
                    Начать заново
                </button>
                 <button
                    onClick={onReload}
                    disabled={isReloading}
                    className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                    {isReloading ? (
                        <>
                           <ReloadIcon className="h-5 w-5 animate-spin" />
                           Генерация...
                        </>
                    ) : (
                       "Сгенерировать еще"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Results;