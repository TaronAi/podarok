
import React from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import Step from './Step';

interface QuizProps {
    step: number;
    onAnswer: (answer: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ step, onAnswer }) => {
    const currentQuestion = QUIZ_QUESTIONS[step];
    const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
        <div className="w-full">
            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <Step key={step} question={currentQuestion} onAnswer={onAnswer} />
        </div>
    );
};

export default Quiz;
