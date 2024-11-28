"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks/hook";
import { setSignOut } from "@/app/lib/slices/auth-slice";
import { Flex, Menu, Space, Button, Typography, Avatar, Dropdown } from "antd";
import { MenuProps } from "antd";
import {
    DownOutlined,
    UserOutlined,
    HistoryOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import logo from "@public/logo.svg";
const { Title, Paragraph } = Typography;

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
    {
        key: "profile",
        label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        icon: <UserOutlined className="!text-base" />,
    },
    {
        key: "history",
        label: <Link href="/exam-history">Lịch sử làm đề</Link>,
        icon: <HistoryOutlined className="!text-base" />,
    },
    {
        key: "signout",
        label: "Đăng xuất",
        icon: <LogoutOutlined className="!text-base" />,
    },
];

const Header = () => {
    const dispatch = useAppDispatch();
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

    const handleDropdownClick: MenuProps["onClick"] = ({ key }) => {
        if (key === "signout") {
            dispatch(setSignOut());
            router.push("/sign-in");
        }
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between px-8 pt-4 backdrop-blur-md">
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
                    className="!cursor-pointer"
                    menu={{
                        items: itemsDropdown,
                        onClick: handleDropdownClick,
                    }}
                    trigger={["click"]}
                    // placement="bottomRight"
                >
                    <Flex justify="center" align="center" gap={8}>
                        <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            style={{
                                backgroundColor: "#4D2C5E",
                                cursor: "pointer",
                            }}
                        />
                        <Flex className="!mr-4" vertical>
                            <Title className="!m-0" level={5}>
                                Pttvi
                            </Title>
                            <Paragraph className="!m-0">Admin</Paragraph>
                        </Flex>
                        <DownOutlined />
                    </Flex>
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
