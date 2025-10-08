import React, { useState, useCallback, useEffect } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import type { QuizAnswers, GiftIdea } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import LoadingAnimation from './components/LoadingAnimation';
import Results from './components/Results';
import HomePage from './pages/HomePage';
import WishlistPage from './pages/WishlistPage';
import BlogPage from './pages/BlogPage';
import { generateGiftIdeas } from './services/geminiService';

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash || '#home');
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswers>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>([]);
    
    const [wishlist, setWishlist] = useState<GiftIdea[]>(() => {
        try {
            const items = window.localStorage.getItem('podari-wishlist');
            return items ? JSON.parse(items) : [];
        } catch (error) {
            console.error("Failed to parse wishlist from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash || '#home');
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    
    useEffect(() => {
        try {
            window.localStorage.setItem('podari-wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error("Failed to save wishlist to localStorage", error);
        }
    }, [wishlist]);

    const fetchGiftIdeas = useCallback((currentAnswers: QuizAnswers) => {
        setError(null);
        return generateGiftIdeas(currentAnswers)
            .then(ideas => {
                setGiftIdeas(ideas);
            })
            .catch(err => {
                console.error("Error generating gift ideas:", err);
                setError("Произошла ошибка при генерации идей. Пожалуйста, попробуйте еще раз.");
            });
    }, []);

    const handleAnswer = useCallback((answer: string) => {
        const currentQuestionKey = QUIZ_QUESTIONS[step].key;
        const newAnswers = { ...answers, [currentQuestionKey]: answer };
        setAnswers(newAnswers);

        if (step < QUIZ_QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            setIsLoading(true);
            fetchGiftIdeas(newAnswers)
                .finally(() => {
                    setTimeout(() => setIsLoading(false), 2500); 
                });
        }
    }, [step, answers, fetchGiftIdeas]);

    const handleReload = useCallback(() => {
        setIsReloading(true);
        fetchGiftIdeas(answers)
            .finally(() => {
                setIsReloading(false);
            });
    }, [answers, fetchGiftIdeas]);

    const handleToggleWishlist = (idea: GiftIdea) => {
        setWishlist(prev => {
            const isInWishlist = prev.some(item => item.id === idea.id);
            if (isInWishlist) {
                return prev.filter(item => item.id !== idea.id);
            } else {
                return [...prev, idea];
            }
        });
    };

    const handleRestart = () => {
        setStep(0);
        setAnswers({});
        setGiftIdeas([]);
        setError(null);
        setIsLoading(false);
        setIsReloading(false);
    };
    
    const isIdeaInWishlist = (id: string) => wishlist.some(item => item.id === id);

    const renderQuizFlow = () => {
        if (isLoading) return <LoadingAnimation />;
        if (error && giftIdeas.length === 0) {
             return (
                <div className="text-center text-white max-w-2xl mx-auto">
                    <p className="text-red-400 text-xl mb-4">{error}</p>
                    <button
                        onClick={handleRestart}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                        Попробовать снова
                    </button>
                </div>
            );
        }
        if (giftIdeas.length > 0) {
            return (
                <div className="max-w-2xl mx-auto">
                    <Results 
                        ideas={giftIdeas} 
                        onRestart={handleRestart} 
                        onReload={handleReload}
                        isReloading={isReloading}
                        wishlist={wishlist}
                        onToggleWishlist={handleToggleWishlist}
                        isIdeaInWishlist={isIdeaInWishlist}
                        error={error}
                    />
                </div>
            );
        }
        return <div className="max-w-2xl mx-auto"><Quiz step={step} onAnswer={handleAnswer} /></div>;
    };
    
    const renderPage = () => {
        switch (route) {
            case '#quiz':
                return renderQuizFlow();
            case '#wishlist':
                return <WishlistPage wishlist={wishlist} onToggleWishlist={handleToggleWishlist} isIdeaInWishlist={isIdeaInWishlist} />;
            case '#blog':
                return <BlogPage />;
            case '#home':
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            <Header wishlistCount={wishlist.length} />
            <main className="flex-grow w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

export default App;