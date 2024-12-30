export const ChoicesTypes = ["A", "B", "C", "D"] as const;
export type ChoicesType = (typeof ChoicesTypes)[number];

export type Choices = Record<ChoicesType, string>;
export interface Question {
    content: string;
    hasParagraph: boolean;
    choices: Choices;
    correctChoices: ChoicesType | null;
    explanation: string;
}

export interface Exam {
    title: string;
    totalQuestions?: number;
    questions?: Question[];
    duration: number;
    totalAttempts: number;
}

