"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    user: string | undefined;
};
type AccessToken = {
    accessToken: string | undefined;
};
type RefreshToken = {
    refreshToken: string | undefined;
};

export type AuthState = User & AccessToken & RefreshToken;
export type CredentialsProps = AccessToken & RefreshToken;
export type AccessTokenProps = AccessToken;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
    } as AuthState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<CredentialsProps>,
        ): void => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },

        setAccessToken: (
            state,
            action: PayloadAction<AccessTokenProps>,
        ): void => {
            state.accessToken = action.payload.accessToken;
        },

        setSignOut: (state): void => {
            state.user = undefined;
            state.accessToken = undefined;
            state.refreshToken = undefined;
        },
    },
});

export default authSlice.reducer;

export const { setCredentials, setSignOut, setAccessToken } = authSlice.actions;
