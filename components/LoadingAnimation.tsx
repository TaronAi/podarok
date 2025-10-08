
import React from 'react';

const LoadingAnimation: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="relative w-32 h-32 mb-6">
                <div className="absolute top-0 left-0 w-full h-full gift-box-base">
                    <div className="w-full h-full bg-pink-500 rounded-md"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-purple-600"></div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-purple-600"></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-8 gift-box-lid animate-lid-open">
                    <div className="w-[115%] h-full bg-pink-600 rounded-t-md absolute left-1/2 -translate-x-1/2 -top-1"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-purple-700"></div>
                </div>
            </div>
            <h3 className="text-2xl font-bold text-white animate-pulse">Подбираем идеальный подарок...</h3>
            <p className="text-slate-300 mt-2">Магия искусственного интеллекта в действии!</p>

            <style>{`
                .gift-box-lid {
                    transform-origin: top left;
                }
                @keyframes lid-open {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(-100deg) translateY(-20px) translateX(-20px); }
                    100% { transform: rotate(-90deg) translateY(-20px) translateX(-20px); opacity: 0; }
                }
                .animate-lid-open {
                    animation: lid-open 2.5s forwards ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default LoadingAnimation;
