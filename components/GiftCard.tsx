import React from 'react';
import type { GiftIdea } from '../types';
import { OzonIcon, WildberriesIcon, YandexMarketIcon } from './MarketplaceIcons';

interface GiftCardProps {
    idea: GiftIdea;
    isInWishlist: boolean;
    onToggleWishlist: () => void;
}

const WishlistIcon: React.FC<{isInWishlist: boolean}> = ({ isInWishlist }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);


const GiftCard: React.FC<GiftCardProps> = ({ idea, isInWishlist, onToggleWishlist }) => {
    const ozonUrl = `https://www.ozon.ru/search/?text=${encodeURIComponent(idea.searchKeywords)}`;
    const wbUrl = `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(idea.searchKeywords)}`;
    const yandexUrl = `https://market.yandex.ru/search?text=${encodeURIComponent(idea.searchKeywords)}`;

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full transform transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-xl font-bold text-pink-400">{idea.name}</h3>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-lg font-semibold bg-slate-700 text-white px-3 py-1 rounded-full whitespace-nowrap">{idea.priceRange}</span>
                     <button 
                        onClick={onToggleWishlist}
                        className={`transition-colors duration-200 ${isInWishlist ? 'text-red-500' : 'text-slate-500 hover:text-red-400'}`}
                        aria-label={isInWishlist ? 'Удалить из вишлиста' : 'Добавить в вишлист'}
                    >
                        <WishlistIcon isInWishlist={isInWishlist} />
                    </button>
                </div>
            </div>
            <p className="mt-3 text-slate-300">{idea.description}</p>
            <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-4">
                <span className="font-semibold text-slate-400">Искать на:</span>
                <div className="flex gap-3">
                    <a href={ozonUrl} target="_blank" rel="noopener noreferrer" title="Ozon" className="p-2 rounded-full bg-slate-700 hover:bg-blue-600 transition-colors">
                        <OzonIcon />
                    </a>
                    <a href={wbUrl} target="_blank" rel="noopener noreferrer" title="Wildberries" className="p-2 rounded-full bg-slate-700 hover:bg-purple-600 transition-colors">
                        <WildberriesIcon />
                    </a>
                    <a href={yandexUrl} target="_blank" rel="noopener noreferrer" title="Yandex.Market" className="p-2 rounded-full bg-slate-700 hover:bg-yellow-500 transition-colors">
                        <YandexMarketIcon />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GiftCard;