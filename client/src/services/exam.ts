/* eslint-disable */
import { appApi } from "@/services/config";
import { Exam, ExamResult } from "@/types/exam";

const examApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getExamById: builder.query<Exam, number>({
            query: (id: number) => ({
                url: `/exam/${id}`,
                method: "GET",
            }),
        }),

        submitExam: builder.mutation({
            query: (body: any) => ({
                url: "/submission",
                method: "POST",
                body: body,
            }),
        }),

        getExamResult: builder.query<
            ExamResult,
            { id: number; submissionId: string }
        >({
            query: ({
                id,
                submissionId,
            }: {
                id: number;
                submissionId: string;
            }) => ({
                url: `/exam/${id}/result/${submissionId}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetExamByIdQuery,
    useSubmitExamMutation,
    useGetExamResultQuery,
} = examApi;
