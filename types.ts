export interface ImageOption {
    text: string;
    imageUrl: string;
}

export interface QuizQuestion {
    key: keyof QuizAnswers;
    text: string;
    options?: string[] | ImageOption[];
    subtext?: string;
    placeholder?: string;
    type: 'options' | 'text' | 'multiselect' | 'image-options';
}

export interface QuizAnswers {
    recipient?: string;
    occasion?: string;
    age?: string;
    budget?: string;
    lifestyle?: string;
    vacation?: string;
    giftType?: string;
    personality?: string;
    hobbies?: string;
    interests?: string;
}

export interface GiftIdea {
    id: string;
    name: string;
    description: string;
    priceRange: string;
    searchKeywords: string;
}