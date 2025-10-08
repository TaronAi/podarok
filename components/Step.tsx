import React, { useState } from 'react';
import type { QuizQuestion, ImageOption } from '../types';

interface StepProps {
    question: QuizQuestion;
    onAnswer: (answer: string) => void;
}

const Step: React.FC<StepProps> = ({ question, onAnswer }) => {
    const [textValue, setTextValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleMultiSelectToggle = (option: string) => {
        setSelectedOptions(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const handleMultiSelectSubmit = () => {
        onAnswer(selectedOptions.join(', '));
    };

    const handleTextSubmit = () => {
        onAnswer(textValue.trim());
    };

    return (
        <div className="flex flex-col items-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">{question.text}</h2>
            {question.subtext && <p className="text-slate-400 text-center mb-8">{question.subtext}</p>}

            {question.type === 'options' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {(question.options as string[]).map((option) => (
                        <button
                            key={option}
                            onClick={() => onAnswer(option)}
                            className="w-full text-left p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-purple-500 transition-all duration-200 transform hover:scale-105"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
            
            {question.type === 'image-options' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {(question.options as ImageOption[]).map((option) => (
                        <button
                            key={option.text}
                            onClick={() => onAnswer(option.text)}
                            className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden text-left hover:border-purple-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <img src={option.imageUrl} alt={option.text} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" />
                            <p className="p-4 font-semibold">{option.text}</p>
                        </button>
                    ))}
                </div>
            )}

            {question.type === 'multiselect' && (
                <div className="w-full flex flex-col items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        {(question.options as string[]).map((option) => {
                            const isSelected = selectedOptions.includes(option);
                            return (
                                <button
                                    key={option}
                                    onClick={() => handleMultiSelectToggle(option)}
                                    className={`w-full text-left p-4 border rounded-lg transition-all duration-200 transform hover:scale-105 ${
                                        isSelected
                                            ? 'bg-purple-600 border-purple-500 text-white'
                                            : 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-purple-500'
                                    }`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                     <button
                        onClick={handleMultiSelectSubmit}
                        disabled={selectedOptions.length === 0}
                        className="mt-6 px-8 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Далее
                    </button>
                </div>
            )}

            {question.type === 'text' && (
                <div className="w-full flex flex-col items-center">
                    <textarea
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        placeholder={question.placeholder}
                        className="w-full h-32 p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
                        rows={4}
                    />
                    <button
                        onClick={handleTextSubmit}
                        className="mt-4 px-8 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors"
                    >
                        Завершить и получить идеи
                    </button>
                </div>
            )}
        </div>
    );
};

export default Step;
