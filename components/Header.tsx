import React, { useState, useEffect } from 'react';

const GiftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-9 sm:w-9 inline-block text-pink-500" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12.75 3.25a.75.75 0 00-1.5 0V5.5h-2.5V3.25a.75.75 0 00-1.5 0V5.5h-1a3 3 0 00-3 3v2.25a3 3 0 003 3v4.5a3 3 0 003 3h3.5a3 3 0 003-3v-4.5a3 3 0 003-3V8.5a3 3 0 00-3-3h-1V3.25zm-3 15V13.25a.75.75 0 00-.75-.75H6.5a1.5 1.5 0 01-1.5-1.5V8.5a1.5 1.5 0 011.5-1.5h2.5a.75.75 0 00.75-.75V3.75a2.25 2.25 0 012.25-2.25c1.01 0 1.87.67 2.15 1.6a.75.75 0 001.4-.4 3.75 3.75 0 00-3.55-2.7C9.96 0 8 1.99 8 4.37V7H6.5a1.5 1.5 0 010-3h1a.75.75 0 000-1.5h-1a3 3 0 00-3 3v2.25a3 3 0 003 3H9v5.12c0 2.42 1.99 4.38 4.45 4.38h.05a.75.75 0 000-1.5h-.05A2.95 2.95 0 0110.5 18.25h-.75zM17.5 7h-2.5a.75.75 0 00-.75.75v5.25c0 .41.34.75.75.75h2.5a1.5 1.5 0 011.5 1.5v2.5a1.5 1.5 0 01-1.5 1.5h-3.5a1.5 1.5 0 01-1.5-1.5v-4.5a.75.75 0 00-.75-.75h-.5a.75.75 0 000 1.5h.5a2.25 2.25 0 012.25 2.25v4.5a3 3 0 003 3h3.5a3 3 0 003-3v-2.5a3 3 0 00-3-3h-2.5V8.5a1.5 1.5 0 011.5-1.5h1a.75.75 0 000-1.5h-1a3 3 0 00-3 3v.25a.75.75 0 001.5 0V8.5a1.5 1.5 0 011.5-1.5z" clipRule="evenodd" />
  </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface HeaderProps {
    wishlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ wishlistCount }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
             document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="bg-slate-900/70 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20 border-b border-slate-800">
                        <a href="#home" className="flex items-center gap-2">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Podari Ai</span>
                                <GiftIcon />
                            </h1>
                        </a>
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-slate-300 hover:text-pink-400 transition-colors font-medium">Главная</a>
                            <a href="#quiz" className="text-slate-300 hover:text-pink-400 transition-colors font-medium">Найти подарок</a>
                            <a href="#wishlist" className="relative text-slate-300 hover:text-pink-400 transition-colors font-medium">
                                Вишлист
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 -right-3.5 flex items-center justify-center h-5 w-5 bg-pink-600 text-white text-xs rounded-full">
                                        {wishlistCount}
                                    </span>
                                )}
                            </a>
                            <a href="#blog" className="text-slate-300 hover:text-pink-400 transition-colors font-medium">Идеи</a>
                        </nav>
                        <div className="md:hidden">
                             <button 
                                onClick={() => setIsMenuOpen(true)} 
                                className="text-slate-300 hover:text-pink-400"
                                aria-label="Открыть меню"
                            >
                                <MenuIcon className="h-7 w-7" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-slate-900 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
                    <div className="flex items-center justify-between h-20 border-b border-slate-800">
                         <a href="#home" onClick={handleLinkClick} className="flex items-center gap-2">
                            <h1 className="text-3xl font-extrabold tracking-tight">
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Podari Ai</span>
                            </h1>
                        </a>
                        <button 
                            onClick={() => setIsMenuOpen(false)} 
                            className="text-slate-300 hover:text-pink-400"
                            aria-label="Закрыть меню"
                        >
                            <CloseIcon className="h-8 w-8" />
                        </button>
                    </div>
                    <nav className="flex flex-col items-center justify-center flex-grow space-y-8 text-center">
                        <a href="#home" onClick={handleLinkClick} className="text-2xl text-slate-300 hover:text-pink-400 transition-colors font-medium">Главная</a>
                        <a href="#quiz" onClick={handleLinkClick} className="text-2xl text-slate-300 hover:text-pink-400 transition-colors font-medium">Найти подарок</a>
                        <a href="#wishlist" onClick={handleLinkClick} className="relative text-2xl text-slate-300 hover:text-pink-400 transition-colors font-medium">
                            Вишлист
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-4 flex items-center justify-center h-6 w-6 bg-pink-600 text-white text-sm rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                        </a>
                        <a href="#blog" onClick={handleLinkClick} className="text-2xl text-slate-300 hover:text-pink-400 transition-colors font-medium">Идеи</a>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Header;