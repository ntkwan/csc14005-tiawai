"use client";
import React, { useState, useEffect } from "react";
import {
    Button,
    Typography,
    Card,
    Radio,
    Space,
    Divider,
    Layout,
    Form,
    notification,
} from "antd";
import { exam_1 } from "../test";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;
const { Sider, Content } = Layout;
const questions = exam_1.questions;

const siderStyle: React.CSSProperties = {
    overflowY: "auto",
    maxHeight: "85vh",
    position: "sticky",
    top: 80,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    backgroundColor: "#f5f5f5",
    padding: "20px",
};

export default function StartExamPage() {
    const router = useRouter();

    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: string | null;
    }>({});

    const [timeLeft, setTimeLeft] = useState(60 * 60);

    const handleAnswerChange = (questionId: number, answer: string) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    const handleSubmit = () => {
        const queryParams = new URLSearchParams();

        Object.entries(selectedAnswers).forEach(([key, value]) => {
            queryParams.append(`answer_${key}`, value || ""); // Appending each answer
        });

        router.push(`result?${queryParams.toString()}`);

        notification.success({
            message: "Nộp bài thành công",
            description: "Bài thi của bạn đã được ghi nhận",
        });
    };

    return (
        <Layout className="!scroll-smooth">
            <Content style={{ padding: "20px" }}>
                <Form onFinish={handleSubmit}>
                    {questions.map((question, index) => (
                        <Card
                            id={`${index}`}
                            key={question.id}
                            style={{ marginBottom: 20 }}
                        >
                            <Title level={4}>
                                {question.id}. {question.question}
                            </Title>
                            <Radio.Group
                                onChange={(e) =>
                                    handleAnswerChange(
                                        question.id,
                                        e.target.value,
                                    )
                                }
                                value={selectedAnswers[question.id] || null}
                            >
                                <Space direction="vertical">
                                    {question.options.map((option, i) => (
                                        <Radio key={i} value={option}>
                                            {option}
                                        </Radio>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </Card>
                    ))}
                </Form>
            </Content>

            <Sider width={250} style={siderStyle}>
                <Paragraph strong>Thời gian còn lại:</Paragraph>
                <Title className="!m-0" type="danger" level={2}>
                    {formatTime(timeLeft)}
                </Title>

                <Button
                    className="!mt-2 !w-full"
                    type="primary"
                    size="large"
                    htmlType="submit"
                    onClick={handleSubmit}
                >
                    Nộp Bài
                </Button>

                <Paragraph className="!mt-2 text-[#ff7a45]">
                    Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để
                    đánh dấu review
                </Paragraph>

                <Divider />

                <Title level={4}>Part</Title>
                <div
                    className="grid grid-cols-5 gap-1"
                    style={{
                        gridTemplateRows: `repeat(${Math.ceil(questions.length / 5)}, max-content)`,
                    }}
                >
                    {Array.from({ length: questions.length }, (_, index) => (
                        <Button
                            key={index}
                            type={
                                selectedAnswers[index + 1]
                                    ? "primary"
                                    : "default"
                            }
                            style={{ padding: "8px", height: "36px" }}
                            href={`#${index}`}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </Sider>
        </Layout>
    );
}
