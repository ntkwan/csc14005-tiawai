"use client";
import { Table, Typography } from "antd";
const { Title } = Typography;

const columns = [
    {
        title: "Ngày làm",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Kết quả",
        dataIndex: "result",
        key: "result",
    },
    {
        title: "Thời gian làm bài",
        dataIndex: "duration",
        key: "duration",
    },
    {
        title: "",
        dataIndex: "details",
        key: "details",
        render: () => <a>Xem chi tiết</a>,
    },
];

export const ExamHistory = () => {
    const dataSource = [
        {
            key: "1",
            date: "2023-10-01",
            result: "80%",
            duration: "45 phút",
            details: "Xem chi tiết",
        },
    ];
    return (
        <>
            <Title level={5}>Kết quả làm bài của bạn:</Title>
            <Table
                size="large"
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </>
    );
};
