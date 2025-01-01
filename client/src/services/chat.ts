import { appApi } from '@/services/config';

const chatApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (body) => ({
                url: '/messages',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Chat'],
        }),

        getBotAnswer: builder.mutation({
            query: (sessionId: string) => ({
                url: `/messages/${sessionId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Chat'],
        }),

        getMessagesBySession: builder.query({
            query: (sessionId: string) => ({
                url: `/messages/${sessionId}`,
                method: 'GET',
            }),
            providesTags: ['Chat'],
        }),

        createSession: builder.mutation({
            query: (body) => ({
                url: `/chat-sessions`,
                method: 'POST',
                body,
            }),
        }),

        disableSession: builder.mutation({
            query: (sessionId: string) => ({
                url: `/chat-sessions/${sessionId}`,
                method: 'PATCH',
            }),
        }),
    }),
});

export const {
    useSendMessageMutation,
    useGetBotAnswerMutation,
    useGetMessagesBySessionQuery,
    useCreateSessionMutation,
    useDisableSessionMutation,
} = chatApi;
