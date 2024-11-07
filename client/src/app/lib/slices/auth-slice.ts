"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    user: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

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
            action: PayloadAction<{
                accessToken: string | null;
                refreshToken: string | null;
            }>,
        ) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },

        setRefreshToken: (
            state,
            action: PayloadAction<{ refreshToken: string | null }>,
        ) => {
            state.refreshToken = action.payload.refreshToken;
        },

        setLogOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export default authSlice.reducer;

export const { setCredentials, setLogOut, setRefreshToken } = authSlice.actions;
