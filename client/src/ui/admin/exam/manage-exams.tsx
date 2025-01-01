/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { Flex, Table, Button, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterIcon } from "@/ui/admin/icons";
import { useGetExamsQuery, useDeleteExamByIdMutation } from "@/services/exam";
import { Exam } from "@/types/exam";

export default function ManageExams() {
    const { data: exams, isLoading } = useGetExamsQuery();
    const [deleteExamById, { isLoading: isLoadingDelete }] =
        useDeleteExamByIdMutation();
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState<Exam[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    useEffect(() => {
        if (exams) {
            setFilteredData(exams);
        }
    }, [exams]);

    const handleSearch = (value: string) => {
        setSearchText(value);
        const filtered = exams?.filter((exam: any) =>
            exam.title.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const columns = [
        {
            title: "Tên đề thi",
            dataIndex: "title",
            key: "title",
        },
        // {
        //     title: "Ngày",
        //     dataIndex: "date",
        //     key: "date",
        // },
        {
            title: "Thời gian (phút)",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Lượt làm",
            dataIndex: "totalAttempts",
            key: "totalAttempts",
        },
        {
            title: "Thanh điều khiển",
            key: "actions",
            render: (_: any, record: any) => (
                <Flex justify="start" gap={10}>
                    <Button
                        shape="round"
                        onClick={() => console.log("Xem:", record)}
                        className="!bg-[#DAE3E9] text-black"
                    >
                        Xem
                    </Button>
                    <Button
                        type="primary"
                        shape="round"
                        danger
                        loading={isLoadingDelete}
                        onClick={() => deleteExamById(record.id)}
                    >
                        Xóa
                    </Button>
                </Flex>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            <Flex
                justify="space-between"
                align="center"
                gap={20}
                style={{ marginBottom: 20 }}
            >
                <Input
                    size="large"
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{
                        background: "#E9DAE9",
                        maxWidth: 400,
                    }}
                    className="font-roboto text-black"
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
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    position: ["bottomCenter"],
                    pageSize: pageSize,
                    pageSizeOptions: [5, 10, 20, 50],
                    total: filteredData?.length || 0,
                    showSizeChanger: true,
                    current: currentPage,
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
}
