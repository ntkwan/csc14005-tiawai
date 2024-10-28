import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tiawai",
    description: "Nền tảng luyện thi  THPTQG môn Tiếng Anh cùng với AI",
};

export default function StudyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <section className="mx-8 pb-40 pt-8">{children}</section>;
}
