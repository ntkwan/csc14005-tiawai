import { appApi } from "@/services/config";
import { Exam } from "@/types/exam";
import { User } from "@/types/user";

const adminApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => ({
                url: "/user/users",
                method: "GET",
            }),
        }),

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
                url: "/exam/tests",
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
    }),
});

export const {
    useGetUsersQuery,
    useCreateExamMutation,
    useGetExamsQuery,
    useDeleteExamByIdMutation,
} = adminApi;
