"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/hook";
import useTokenExpirationChecker from "@/app/lib/hooks/token-exp-checker";

const protectedRoutes = ["/profile"];

export default function ProtetedRoutes({
    children,
}: {
    children: React.ReactNode;
}) {
    useTokenExpirationChecker();
    const { refreshToken } = useAppSelector((state) => state.auth);
    const pathname = usePathname();
    const router = useRouter();

    const isProtected = protectedRoutes.includes(pathname) && !refreshToken;

    useEffect(() => {
        if (isProtected) {
            router.push("/sign-in");
        }
    }, [isProtected, router]);

    return <>{children}</>;
}
