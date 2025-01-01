/* eslint-disable */
import { appApi } from "@/services/config";
import { Exam, ExamResult } from "@/types/exam";

const examApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        createExam: builder.mutation({
            query: (exam) => ({
                url: "/exam",
                method: "POST",
                body: exam,
            }),
            invalidatesTags: ["Exam"],
        }),

        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: "/exam",
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

        deleteExamById: builder.mutation({
            query: (id: number) => ({
                url: `/exam/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Exam"],
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
    useCreateExamMutation,
    useGetExamsQuery,
    useGetExamByIdQuery,
    useDeleteExamByIdMutation,
    useSubmitExamMutation,
    useGetExamResultQuery,
} = examApi;
