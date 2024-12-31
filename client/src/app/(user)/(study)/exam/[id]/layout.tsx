"use client";
import { createContext } from "react";
import { Exam } from "@/types/exam";
import { useGetExamByIdQuery } from "@/services/exam";

export const ExamContext = createContext<Exam | undefined>(undefined);

export default function ExamLayout({
    params,
    children,
}: {
    params: { id: number };
    children: React.ReactNode;
}) {
    const { data: exam, isLoading } = useGetExamByIdQuery(params.id);
    if (isLoading) {
        return null;
    }

    return <ExamContext.Provider value={exam}>{children}</ExamContext.Provider>;
}
