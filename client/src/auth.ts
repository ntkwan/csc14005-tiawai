import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { jwtDecode } from "jwt-decode";
import { User } from "next-auth";
import { handleSignIn } from "@/lib/api/auth-server-api";

const providers: Provider[] = [
    Credentials({
        credentials: {
            username: {},
            password: {},
        },
        authorize: async (credentials) => {
            const { username, password } = credentials;
            const data = await handleSignIn({ username, password });
            const { accessToken, refreshToken } = data as User;
            return { accessToken, refreshToken };
        },
    }),
    GitHub,
];

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    })
    .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const decoded = jwtDecode(user.accessToken);
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    iat: decoded.iat,
                    exp: decoded.exp,
                    user: {
                        email: decoded?.sub,
                        role: "user",
                    },
                };
            } else if (Date.now() < (token?.exp || 0) * 1000 - 300) {
                return token;
            } else {
                try {
                    const res = await fetch(
                        process.env.BACKEND_BASE_URL + "auth/refresh-token",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token.refreshToken}`,
                            },
                        },
                    );

                    if (res.ok) {
                        return {
                            ...token,
                            accessToken: (await res.json()).accessToken,
                            exp: jwtDecode(token.accessToken).exp || 0,
                        };
                    }
                } catch (error) {
                    console.error(error);
                    token.error = "RefreshTokenError";
                    return token;
                }
            }
            return token;
        },
        async session({ session, token }) {
            const decoded = jwtDecode(token.refreshToken);
            return {
                ...session,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                expires: decoded.exp
                    ? new Date(decoded.exp * 1000).toISOString()
                    : "",
                user: {
                    email: token.user.email,
                    role: token.user.role,
                },
                error: token.error,
            };
        },
    },
});
