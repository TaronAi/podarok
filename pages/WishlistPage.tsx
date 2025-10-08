import React from 'react';
import type { GiftIdea } from '../types';
import GiftCard from '../components/GiftCard';

interface WishlistPageProps {
    wishlist: GiftIdea[];
    onToggleWishlist: (idea: GiftIdea) => void;
    isIdeaInWishlist: (id: string) => boolean;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ wishlist, onToggleWishlist, isIdeaInWishlist }) => {
    return (
        <div className="animate-fade-in-slow max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Ваш вишлист ❤️</h1>
                <p className="text-lg text-slate-400">Здесь хранятся все подарки, которые вы сохранили.</p>
            </div>

            {wishlist.length > 0 ? (
                <div className="space-y-4">
                    {wishlist.map(idea => (
                        <GiftCard 
                            key={idea.id}
                            idea={idea}
                            isInWishlist={isIdeaInWishlist(idea.id)}
                            onToggleWishlist={() => onToggleWishlist(idea)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center bg-slate-800 p-12 rounded-lg border border-slate-700">
                    <p className="text-2xl font-bold mb-2">Ваш вишлист пока пуст</p>
                    <p className="text-slate-400 mb-6">Нажмите на сердечко на карточке с подарком, чтобы сохранить его здесь.</p>
                    <a href="#quiz" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Найти подарки
                    </a>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
