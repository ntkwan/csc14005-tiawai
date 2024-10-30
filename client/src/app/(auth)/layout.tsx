import AuthBackground from "@/ui/auth/auth-background";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="auth__layout relative min-h-screen max-w-[100vw] content-center overflow-hidden bg-[url('/auth-bg/auth-bg.png')]">
            <AuthBackground />
            {children}
        </div>
    );
}
