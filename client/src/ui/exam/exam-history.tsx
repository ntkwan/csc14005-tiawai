"use client";
import { Table, Typography } from "antd";
import { useGetSubmissionsQuery } from "@/services/exam";
const { Title } = Typography;

const columns = [
    {
        title: "Ngày làm",
        dataIndex: "submitAt",
        key: "submitAt",
        render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
        title: "Kết quả",
        dataIndex: "pts",
        key: "pts",
    },
    {
        title: "Thời gian làm bài",
        dataIndex: "timeConsumed",
        key: "timeConsumed",
    },
    {
        title: "",
        dataIndex: "details",
        key: "details",
        render: () => <p>Xem chi tiết</p>,
    },
];

export const ExamHistory = ({ id }: { id: number }) => {
    const { data, isLoading } = useGetSubmissionsQuery(id);
    if (isLoading) return null;

    return (
        <>
            <Title level={5}>Kết quả làm bài của bạn:</Title>
            <Table
                size="large"
                rowKey={(record) => record.submissionId || ""}
                dataSource={data || []}
                columns={columns}
                pagination={false}
            />
        </>
    );
};
