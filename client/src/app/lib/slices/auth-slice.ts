"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    user: string | null;
};
type AccessToken = {
    accessToken: string | null;
};
type RefreshToken = {
    refreshToken: string | null;
};

export type AuthState = User & AccessToken & RefreshToken;
type CredentialsProps = AccessToken & RefreshToken;
type RefreshTokenProps = RefreshToken;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
    } as AuthState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<CredentialsProps>,
        ): void => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },

        setRefreshToken: (
            state,
            action: PayloadAction<RefreshTokenProps>,
        ): void => {
            state.refreshToken = action.payload.refreshToken;
        },

        setLogOut: (state): void => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export default authSlice.reducer;

export const { setCredentials, setLogOut, setRefreshToken } = authSlice.actions;
