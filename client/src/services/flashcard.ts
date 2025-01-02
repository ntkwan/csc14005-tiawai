import { appApi } from "@/services/config";

const flashcardApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createFlashcard: builder.mutation({
            query: (body) => ({
                url: "/flashcard",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Flashcard"],
        }),
    }),
});

export const { useCreateFlashcardMutation } = flashcardApi;
