"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Button,
    Card,
    Col,
    Divider,
    Layout,
    Row,
    Space,
    Tabs,
    Typography,
    Radio,
} from "antd";
import type { RadioChangeEvent } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ExamHistory } from "@/ui/exam";
import { exam_1 } from "./test";

const { Title } = Typography;
const { Content } = Layout;

export default function ExamPage() {
    const [mode, setMode] = useState<string>("1");

    const onChange = (e: RadioChangeEvent) => {
        setMode(e.target.value);
    };

    return (
        <Layout style={{ minHeight: "100vh", padding: "20px" }}>
            <Content>
                <Card bordered={false}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Title level={4}>
                            {exam_1.title}{" "}
                            <CheckCircleOutlined style={{ color: "green" }} />
                        </Title>

                        <Radio.Group
                            size="large"
                            value={mode}
                            onChange={onChange}
                            style={{ marginBottom: 16 }}
                        >
                            <Radio.Button value="1">
                                Thông tin đề thi
                            </Radio.Button>
                            <Radio.Button value="2">
                                Đáp án/transcript
                            </Radio.Button>
                        </Radio.Group>

                        {mode === "1" && (
                            <>
                                <Title level={5}>
                                    Thời gian làm bài: 60 phút
                                </Title>
                                <Title level={5}>
                                    {exam_1.participants.toLocaleString()} người
                                    đã luyện tập đề thi này
                                </Title>

                                <Divider />

                                <ExamHistory />

                                <Tabs size="large" defaultActiveKey="1">
                                    <Tabs.TabPane tab="Luyện tập" key="1">
                                        <Row gutter={[16, 16]}>
                                            <Col span={24}>
                                                <Card className="!border-[#b7eb8f] !bg-[#f6ffed]">
                                                    <Title
                                                        className="!m-0"
                                                        type="success"
                                                        level={5}
                                                    >
                                                        Protips: Hình thức luyện
                                                        tập từng phần và chọn
                                                        mức thời gian phù hợp sẽ
                                                        giúp bạn tập trung vào
                                                        giải đúng các câu hỏi
                                                        thay vì phải chịu áp lực
                                                        hoàn thành bài thi.
                                                    </Title>
                                                </Card>
                                            </Col>

                                            <Col>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    size="large"
                                                >
                                                    <Link href="1/start">
                                                        Luyện tập
                                                    </Link>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Làm full test" key="2">
                                        <Row gutter={[16, 16]}>
                                            <Col span={24}>
                                                <Card className="!border-[#faad14] !bg-[#fff7e6]">
                                                    <Title
                                                        className="!m-0"
                                                        type="warning"
                                                        level={5}
                                                    >
                                                        Sẵn sàng để bắt đầu làm
                                                        full test? Để đạt được
                                                        kết quả tốt nhất, bạn
                                                        cần dành ra 60 phút cho
                                                        bài test này.
                                                    </Title>
                                                </Card>
                                            </Col>

                                            <Col>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    size="large"
                                                >
                                                    <Link href="1/start">
                                                        Bắt đầu thi
                                                    </Link>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>
                                </Tabs>
                            </>
                        )}
                    </Space>
                </Card>
            </Content>
        </Layout>
    );
}
