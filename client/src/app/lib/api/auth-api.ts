"use client";
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
            query: () => "/auth/refresh-token",
        }),

        passwordRecovery: builder.mutation({
            query: ({ email }) => ({
                url: "/auth/password-recovery",
                method: "POST",
                body: {
                    email,
                },
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ email, otp, newPassword, confirmPassword }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: {
                    email,
                    otp,
                    newPassword,
                    confirmPassword,
                },
            }),
        }),

        getMyProfile: builder.query<void, void>({
            query: () => "/auth/get-my-profile",
        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useRefreshTokenMutation,
    usePasswordRecoveryMutation,
    useResetPasswordMutation,
    useGetMyProfileQuery,
} = authApi;
