"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/hook";
import { useSession } from "next-auth/react";
import { setAuthState } from "@/lib/slices/auth";
import { useSignOutMutation } from "./services/auth";
import { useAppSelector } from "@/lib/hooks/hook";
import { setCridentials } from "@/lib/slices/auth";
import { handleRefreshToken } from "@/services/auth";
import { User } from "next-auth";

export default function NextAuthWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const { data: session } = useSession();
    const [signOut] = useSignOutMutation();
    const auth = useAppSelector((state) => state.auth);

    useEffect(() => {
        const handleSignOut = async () => {
            if (auth.refreshToken) {
                const res = await handleRefreshToken(
                    auth.refreshToken as string,
                );

                if (!res) return;
                if (res?.error) return;

                const { accessToken } = res as User;
                dispatch(setCridentials({ accessToken, refreshToken: "" }));
                await signOut({});
            }
        };

        if (session?.error === "RefreshTokenError" || session === null) {
            if (auth.user) {
                handleSignOut();
            }
        } else {
            setLoading(true);
            if (
                session?.user &&
                session?.accessToken &&
                session?.refreshToken
            ) {
                dispatch(
                    setAuthState({
                        user: session.user,
                        accessToken: session.accessToken,
                        refreshToken: session.refreshToken,
                    }),
                );
            }
            setLoading(false);
        }
    }, [signOut, dispatch, session, auth.user, auth.refreshToken]);

    if (loading) return null;

    return <>{children}</>;
}
