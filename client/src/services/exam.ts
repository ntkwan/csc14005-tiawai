/* eslint-disable */
import { appApi } from "@/services/config";
import { Exam, ExamResult } from "@/types/exam";

const examApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: "/exam",
                method: "GET",
            }),
            providesTags: ["Exam"],
        }),

        getExamPractices: builder.query<Exam[], void>({
            query: () => ({
                url: "/exam/practices",
                method: "GET",
            }),
            providesTags: ["Exam"],
        }),

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

        getSubmissions: builder.query<ExamResult[], number>({
            query: (id: number) => ({
                url: `/exam/${id}/submissions`,
                method: "GET",
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
    useGetExamsQuery,
    useGetExamPracticesQuery,
    useGetExamByIdQuery,
    useSubmitExamMutation,
    useGetSubmissionsQuery,
    useGetExamResultQuery,
} = examApi;
