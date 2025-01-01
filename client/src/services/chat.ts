import { appApi } from '@/services/config';

const chatApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (message) => ({
                url: '/messages',
                method: 'POST',
                body: message,
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
    useGetMessagesBySessionQuery,
    useCreateSessionMutation,
    useDisableSessionMutation,
} = chatApi;
