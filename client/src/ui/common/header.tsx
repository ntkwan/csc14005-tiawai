"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSignOutMutation } from "@/lib/api/auth-api";

type MenuItem = Required<MenuProps>["items"][number];

const adminItems: MenuItem[] = [
    {
        label: <Link href="/admin">Thống kê</Link>,
        key: "dashboard",
    },
    {
        label: <Link href="/admin/users">Quản lý người dùng</Link>,
        key: "users",
    },
    {
        label: <Link href="/admin/exams">Kho đề thi</Link>,
        key: "exams",
    },
    {
        label: <Link href="/admin/practices">Kho đề luyện tập</Link>,
        key: "practices",
    },
    {
        label: <Link href="/admin/reports">Quản lý báo cáo</Link>,
        key: "reports",
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
    const [signOutMutation] = useSignOutMutation();
    const pathname = usePathname();
    const router = useRouter();
    const session = useSession();

    const currentPath = pathname === "/" ? "home" : pathname?.split("/")[1];
    const [current, setCurrent] = useState(currentPath);

    useEffect(() => {
        setCurrent(currentPath);
    }, [currentPath, session]);

    const onClick: MenuProps["onClick"] = ({ key }) => {
        setCurrent(key);
    };

    const handleDropdownClick: MenuProps["onClick"] = async ({ key }) => {
        if (key === "signout") {
            await signOutMutation(undefined);
            await signOut();
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
                items={adminItems}
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

            {session.data?.accessToken ? (
                <Dropdown
                    className="!cursor-pointer"
                    menu={{
                        items: itemsDropdown,
                        onClick: handleDropdownClick,
                    }}
                    trigger={["click"]}
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
                                {session.data.user.email}
                            </Title>
                            <Paragraph className="!m-0">
                                {session?.data?.user?.role
                                    ? session.data.user.role
                                          .charAt(0)
                                          .toUpperCase() +
                                      session.data.user.role.slice(1)
                                    : "User"}
                            </Paragraph>
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
                        onClick={() => router.push("/sign-in")}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        size="large"
                        shape="round"
                        onClick={() => router.push("/sign-up")}
                    >
                        Đăng ký
                    </Button>
                </Space>
            )}
        </header>
    );
};

export default Header;
