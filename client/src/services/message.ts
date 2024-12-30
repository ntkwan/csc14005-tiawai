import { appApi } from "@/services/config";

const messageApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (message) => ({
                url: "/messages",
                method: "POST",
                body: message,
            }),
        }),
    }),
});

export const { useSendMessageMutation } = messageApi;
