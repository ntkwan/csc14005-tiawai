"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/hook";
import { useSession, signOut } from "next-auth/react";
import { setAuthState } from "@/lib/slices/auth";
import { useSignOutMutation } from "./services/auth";

export default function NextAuthWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const { data: session } = useSession();
    const [signOutMutation] = useSignOutMutation();

    useEffect(() => {
        if (session?.error === "RefreshTokenError") {
            signOutMutation(undefined);
            signOut();
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
    }, [signOutMutation, dispatch, session]);

    if (loading) return null;

    return <>{children}</>;
}
