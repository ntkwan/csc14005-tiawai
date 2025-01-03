import { appApi } from '@/services/config';

const flashcardApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createFlashcard: builder.mutation({
            query: (body) => ({
                url: '/flashcard',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Flashcard'],
        }),

        getAllFlashcardTopics: builder.query({
            query: () => '/flashcard',
            providesTags: ['Flashcard'],
        }),

        getFlashcardsByTopic: builder.query({
            query: (topic) => `/flashcard/${topic}`,
            providesTags: ['Flashcard'],
        }),
    }),
});

export const {
    useCreateFlashcardMutation,
    useGetAllFlashcardTopicsQuery,
    useGetFlashcardsByTopicQuery,
} = flashcardApi;
