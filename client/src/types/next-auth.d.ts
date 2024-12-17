/* eslint-disable */
import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type RefreshTokenError = "RefreshTokenError";
export type Role = "user" | "admin";

declare module "next-auth" {
    interface User {
        refreshToken: string;
        accessToken: string;
    }

    interface Account {
        provider: string;
        type: string;
        id: string;
        refreshToken: string;
        accessToken: string;
        accessTokenExpires: number;
    }

    interface Session {
        accessToken: string;
        refreshToken: string;
        expires: string;
        user: {
            email?: string;
            role?: Role;
        };
        error?: RefreshTokenError;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        user: {
            email?: string;
            role?: Role;
        };
        error?: RefreshTokenError;
    }
}
