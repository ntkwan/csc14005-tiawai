import { appApi } from "./api-config";

const adminApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        createExam: builder.mutation({
            query: (exam) => ({
                url: "/exam",
                method: "POST",
                body: exam,
            }),
        }),
    }),
});

export const { useCreateExamMutation } = adminApi;
