import { appApi } from "./api-config";

const authApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({ username, email, password }) => ({
                url: "/auth/sign-up",
                method: "POST",
                body: {
                    username,
                    email,
                    password,
                },
            }),
        }),

        signIn: builder.mutation({
            query: ({ username, password }) => ({
                url: "/auth/sign-in",
                method: "POST",
                body: {
                    username,
                    password,
                },
            }),
        }),

        signOut: builder.mutation({
            query: () => ({
                url: "/auth/sign-out",
                method: "POST",
            }),
        }),

        refreshToken: builder.mutation({
            query: () => ({
                url: "/auth/refresh-token",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useRefreshTokenMutation,
} = authApi;
