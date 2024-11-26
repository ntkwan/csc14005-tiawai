"use client";
import { useState } from "react";
import {
    Button,
    Card,
    Col,
    Row,
    Space,
    Typography,
    Modal,
    Collapse,
    Divider,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { exam_1 } from "../test";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function ExamResultPage() {
    const examData = exam_1;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const correctAnswersCount = examData.questions.reduce((count, question) => {
        return question.answer === question.correct ? count + 1 : count;
    }, 0);

    const skipAnswersCount = examData.questions.reduce((count, question) => {
        return question.answer === null ? count + 1 : count;
    }, 0);

    const accuracy = (correctAnswersCount / examData.testInfo.questions) * 100;

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Title level={3}>Kết quả thi: {examData.title}</Title>
                <Space>
                    <Button type="primary" size="large" shape="round">
                        Xem đáp án
                    </Button>
                    <Button size="large" shape="round">
                        Quay về trang đề thi
                    </Button>
                </Space>
            </Col>

            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Text strong>Kết quả làm bài</Text>
                        <Title level={2}>
                            {correctAnswersCount}/{examData.testInfo.questions}
                        </Title>
                        <Text>Độ chính xác: {accuracy.toFixed(2)}%</Text>
                        <Text>Thời gian hoàn thành: {examData.duration}</Text>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card>
                        <Title className="!text-[#52c41a]" level={4}>
                            Trả lời đúng
                        </Title>
                        <Title className="!text-[#52c41a]" level={2}>
                            {correctAnswersCount}
                        </Title>
                        <Text>câu hỏi</Text>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card>
                        <Title className="!text-[#f87171]" level={4}>
                            Trả lời sai
                        </Title>
                        <Title className="!text-[#f87171]" level={2}>
                            {examData.questions.length -
                                correctAnswersCount -
                                skipAnswersCount}
                        </Title>
                        <Text>câu hỏi</Text>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card>
                        <Title className="!text-[#8c8c8c]" level={4}>
                            Bỏ qua
                        </Title>
                        <Title className="!text-[#8c8c8c]" level={2}>
                            {skipAnswersCount}
                        </Title>
                        <Text>câu hỏi</Text>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={4}>Phân tích chi tiết</Title>

            <Row>
                <Col span={4}>
                    <Text strong>Phân loại câu hỏi</Text>
                </Col>
                <Col span={20}>
                    <Row gutter={[8, 8]}>
                        {examData.questions.map((question) => (
                            <Col key={question.id}>
                                <Button
                                    danger={
                                        question.answer !== question.correct
                                    }
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor:
                                            question.answer !== question.correct
                                                ? "#f87171"
                                                : "#E9DAE9",
                                        color:
                                            question.answer !== question.correct
                                                ? "white"
                                                : "",
                                    }}
                                >
                                    {question.id}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            <Divider />

            <Title level={4}>Part</Title>
            <Row gutter={[16, 16]}>
                {examData.questions.map((question, index) => (
                    <Col span={12} key={question.id}>
                        <Space align="center">
                            <div
                                className="max-h-10 min-h-10 min-w-10 max-w-10 content-center rounded-full bg-[#E9DAE9] text-center font-bold"
                                style={{
                                    lineHeight: "40px",
                                    width: "40px",
                                    height: "40px",
                                    textAlign: "center",
                                }}
                            >
                                {index + 1}
                            </div>
                            <Text>
                                {question.correct}:{" "}
                                {question.answer === question.correct ? (
                                    <>
                                        {question.answer}
                                        <CheckOutlined
                                            style={{
                                                fontSize: 16,
                                                color: "#52c41a",
                                                marginLeft: 8,
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <del>{question.answer}</del>
                                        <CloseOutlined
                                            size={40}
                                            style={{
                                                fontSize: 16,
                                                color: "#ff4d4f",
                                                marginLeft: 8,
                                            }}
                                        />
                                    </>
                                )}
                            </Text>
                            <Button type="link" onClick={showModal}>
                                [Chi tiết]
                            </Button>
                        </Space>
                    </Col>
                ))}
            </Row>

            <Modal
                title="Đáp án chi tiết"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Title level={5}>Giải thích chi tiết</Title>
                <Collapse
                    className="!bg-white"
                    bordered={false}
                    expandIconPosition="right"
                >
                    <Panel header="Click để xem giải thích chi tiết" key="1">
                        <Text>Giải thích chi tiết cho câu hỏi...</Text>
                    </Panel>
                </Collapse>
            </Modal>
        </Row>
    );
}
