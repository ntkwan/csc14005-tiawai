"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

type AccessToken = string | undefined;
type RefreshToken = string | undefined;

export type AuthState = {
    user: User | undefined;
    accessToken: AccessToken;
    refreshToken: RefreshToken;
};

export type CredentialsProps = {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
    } as AuthState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>): void => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },

        setSignOut: (state): void => {
            state.user = undefined;
            state.accessToken = undefined;
            state.refreshToken = undefined;
        },
    },
});

export default authSlice.reducer;

export const { setAuthState, setSignOut } = authSlice.actions;