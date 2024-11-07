"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks/hook";
import { Menu, Space, Button, Typography, Avatar, Dropdown } from "antd";
import { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "@public/logo.svg";
const { Title } = Typography;

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
        label: <Link href="/contact">Liên hệ</Link>,
        key: "contact",
    },
];

const itemsDropdown: MenuProps["items"] = [
    { key: "profile", label: "Trang cá nhân" },
    { key: "logout", label: "Đăng xuất" },
];

const Header = () => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const pathname = usePathname();
    const currentPath = pathname === "/" ? "home" : pathname?.split("/")[1];
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
        <header className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="min-h-max min-w-max items-center rounded-full bg-[#5369A1] px-[9px] py-[3px]">
                    <Image src={logo} alt="logo" />
                </div>
                <Title className="!font-chango !font-normal" level={4}>
                    tiawai
                </Title>
            </div>

            <Menu
                className="!border-none !bg-transparent"
                items={items}
                mode="horizontal"
                onSelect={onClick}
                selectedKeys={[current]}
                disabledOverflow={true}
                style={{
                    fontSize: 16,
                    fontWeight: 600,
                    display: "flex",
                    gap: "1rem",
                }}
            />

            {accessToken ? (
                <Dropdown
                    menu={{ items: itemsDropdown }}
                    placement="bottomRight"
                    arrow
                >
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        style={{
                            backgroundColor: "#4D2C5E",
                            cursor: "pointer",
                        }}
                    />
                </Dropdown>
            ) : (
                <Space size="large">
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        onClick={onLoginClick}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        size="large"
                        shape="round"
                        onClick={onRegisterClick}
                    >
                        Đăng ký
                    </Button>
                </Space>
            )}
        </header>
    );
};

export default Header;
