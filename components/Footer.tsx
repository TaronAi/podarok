import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-slate-400">&copy; {new Date().getFullYear()} Podari Ai. Все права защищены.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter (X)</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Telegram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
