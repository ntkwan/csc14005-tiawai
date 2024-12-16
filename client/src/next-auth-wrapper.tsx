"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/hook";
import { useSession, signOut } from "next-auth/react";
import { setCredentials } from "@/app/lib/slices/auth-slice";
import { useSignOutMutation } from "./app/lib/api/auth-api";

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
                setCredentials({
                    accessToken: session?.accessToken,
                    refreshToken: session?.refreshToken,
                }),
            );
        }
    }, [signOutMutation, dispatch, session]);

    return <>{children}</>;
}
