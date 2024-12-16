import { appApi } from "./api-config";

const aiApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        paraphrase: builder.mutation({
            query: (inputs) => ({
                url: "/ai/paraphrase",
                method: "POST",
                body: {
                    inputs,
                },
            }),
        }),

        flashcard: builder.mutation({
            query: (inputs) => ({
                url: "/ai/flashcard",
                method: "POST",
                body: {
                    inputs,
                },
            }),
        }),
    }),
});

export const { useParaphraseMutation, useFlashcardMutation } = aiApi;
