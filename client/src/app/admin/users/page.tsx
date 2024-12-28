"use client";
import Banner from "@/ui/admin/banner";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Pagination } from "antd";
import { useState } from "react";
import { FilterIcon } from "@/ui/admin/icons";

const users = [
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn A",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
    {
        name: "Nguyễn Văn B",
        createdAt: "22/12/2024",
        email: "abc@gmail.com",
    },
];

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    return (
        <main>
            <Banner>Quản lý người dùng</Banner>
            <Flex
                justify="space-between"
                align="center"
                gap={20}
                className="mx-20 mb-5"
            >
                <Input
                    size="large"
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        background: "#E9DAE9",
                    }}
                    className="font-roboto font-medium text-black"
                />
                <Button
                    icon={<FilterIcon width={18} />}
                    size="large"
                    style={{ background: "#E9DAE9" }}
                    className="font-roboto font-medium"
                >
                    Bộ lọc
                </Button>
            </Flex>
            <Flex vertical align="center" justify="center" className="mx-20">
                {paginatedUsers.map((user, index) => (
                    <Flex
                        key={index}
                        justify="space-between"
                        align="center"
                        gap={20}
                        className={`w-full border-black py-4 ${index == 0 ? "border-y" : "border-b"} pl-8`}
                    >
                        <div className="flex-1 font-roboto text-base font-medium">
                            {user.name}
                        </div>
                        <div className="flex-1 font-roboto text-base font-medium">
                            {user.createdAt}
                        </div>
                        <div className="flex-1 font-roboto text-base font-medium">
                            {user.email}
                        </div>
                        <Flex justify="space-around" gap={20} flex={1}>
                            <button className="rounded-full bg-[#DAE3E9] px-4 py-1 text-center text-base font-medium transition-all duration-100 hover:scale-110">
                                Xem
                            </button>
                            <button className="rounded-full bg-[#CD6D6D] px-4 py-1 text-center text-base font-medium transition-all duration-100 hover:scale-110">
                                Xóa
                            </button>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
            <br />
            <Pagination
                align="center"
                total={filteredUsers.length}
                showSizeChanger
                showLessItems
                defaultPageSize={10}
                current={currentPage}
                onChange={handlePageChange}
            />
        </main>
    );
};

export default Users;
