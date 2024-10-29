import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Header from "@/ui/header";
import ChatButton from "@/ui/chat-button";

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
            <body
                className={`${roboto.variable} mx-[4.375rem] my-[1.5rem] bg-white bg-no-repeat text-black antialiased`}
            >
                <AntdRegistry>
                    <Header />
                    <ChatButton />
                    {children}
                </AntdRegistry>
            </body>
        </html>
    );
}
