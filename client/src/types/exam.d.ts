export const ChoicesTypes = ["A", "B", "C", "D"] as const;
export type ChoicesType = (typeof ChoicesTypes)[number];

export type Choices = Record<ChoicesType, string>;
export interface Question {
    questionId?: number;
    question?: string;
    content: string;
    hasParagraph: boolean;
    paragraph?: string;
    choices: Choices;
    answer?: ChoicesType | null;
    correctAnswer?: ChoicesType | null;
    isCorrect?: boolean;
    points?: number;
    explanation?: string;
    isAnswered?: boolean;
    explanation?: string;
}

export interface Exam {
    id?: number;
    title?: string;
    totalQuestions?: number;
    questions?: Question[];
    duration: number;
    totalAttempts?: number;
    uploadedAt?: string;
}

interface ExamResult {
    score: number;
    totalQuestions: number;
    questions: Question[];
    correctAnswers: number;
    incorrectAnswers: number;
    skippedQuestions: number;
    timeConsumed: number;
}
