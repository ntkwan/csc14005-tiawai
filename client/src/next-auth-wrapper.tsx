"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/hook";
import { useSession, signOut } from "next-auth/react";
import { setAuthState } from "@/lib/slices/auth";
import { useSignOutMutation } from "./services/auth";

export default function NextAuthWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [signOutMutation] = useSignOutMutation();
    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.error === "RefreshTokenError") {
            signOutMutation(undefined);
            signOut();
        } else {
            dispatch(
                setAuthState({
                    user: session?.user,
                    accessToken: session?.accessToken,
                    refreshToken: session?.refreshToken,
                }),
            );
        }
    }, [signOutMutation, dispatch, session]);

    return <>{children}</>;
}
