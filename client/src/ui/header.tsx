"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Space, ConfigProvider } from "antd";
import { MenuProps } from "antd";
import logo from "@public/logo.svg";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {
        label: <Link href="/">Trang chủ</Link>,
        key: "home",
    },
    {
        label: <Link href="/exam">Đề luyện thi</Link>,
        key: "exam",
    },
    {
        label: <Link href="/practice">Luyện tập</Link>,
        key: "practice",
    },
    {
        label: <Link href="/flashcard">Flashcard</Link>,
        key: "flashcard",
    },
    {
        label: <Link href="/paraphrase">Paraphrase</Link>,
        key: "paraphrase",
    },
    {
        label: <Link href="/translate">Dịch</Link>,
        key: "translate",
    },
    {
        label: <Link href="/contact">Liên hệ</Link>,
        key: "contact",
    },
];

const Header = () => {
    const pathname = usePathname();
    const currentPath = pathname === "/" ? "home" : pathname.split("/")[1];
    const [current, setCurrent] = useState(currentPath);
    const router = useRouter();

    useEffect(() => {
        setCurrent(currentPath);
    }, [currentPath]);

    const onClick: MenuProps["onClick"] = ({ key }) => {
        setCurrent(key);
    };
    const onLoginClick = () => {
        router.push("/sign-in");
    };
    const onRegisterClick = () => {
        router.push("/sign-up");
    };

    return (
        <header className="mb-[3.25rem] flex flex-row place-content-between place-items-center">
            <div className="flex flex-row place-items-center gap-2">
                <div className="items-center rounded-full bg-[#5369A1] px-[9px] py-[3px]">
                    <Image src={logo} alt="logo" />
                </div>
                <span className="font-chango text-2xl">tiawai</span>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#4D2C5E",
                    },
                }}
            >
                <Menu
                    items={items}
                    mode="horizontal"
                    onSelect={onClick}
                    selectedKeys={[current]}
                    disabledOverflow={true}
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        display: "flex",
                        gap: "1rem",
                    }}
                />
            </ConfigProvider>
            <Space
                size="large"
                className="*:text-center *:font-roboto *:text-2xl *:font-medium"
            >
                <div
                    className="h-12 w-44 cursor-pointer content-center rounded-full bg-[#4D2C5E] text-[#F8F4FA] transition duration-300 ease-in-out hover:scale-110"
                    onClick={onLoginClick}
                >
                    Đăng nhập
                </div>
                <div
                    className="h-12 w-44 cursor-pointer content-center rounded-full bg-[#F8F4FA] text-[#4D2C5E] transition duration-300 ease-in-out hover:scale-110"
                    onClick={onRegisterClick}
                >
                    Đăng kí
                </div>
            </Space>
        </header>
    );
};

export default Header;
