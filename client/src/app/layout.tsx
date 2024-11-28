import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Roboto } from "next/font/google";
import ThemeProvider from "./theme";
import StoreProvider from "@/lib/store/store-provider";
import ProtetedRoutes from "@/ui/auth/protected-routes";
import "@/app/globals.css";

const roboto = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700", "900"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "tiawai",
    description: "Nền tảng luyện thi  THPTQG môn Tiếng Anh cùng với AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vn">
            <body className={`${roboto.variable}bg-white antialiased`}>
                <StoreProvider>
                    <ThemeProvider>
                        <AntdRegistry>
                            <ProtetedRoutes>{children}</ProtetedRoutes>
                        </AntdRegistry>
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
