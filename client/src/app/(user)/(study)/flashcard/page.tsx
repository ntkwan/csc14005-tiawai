"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Typography } from "antd";
import { twMerge } from "tailwind-merge";
import fcBannerImage from "@public/flashcard/banner-img.png";
import GenerateButton from "@/ui/generate-button";
import scienceImage from "@public/flashcard/science.png";
import researchImage from "@public/flashcard/research.png";
import officeImage from "@public/flashcard/office.png";
import itImage from "@public/flashcard/it.png";
import literatureImage from "@public/flashcard/literature.png";
import cultureImage from "@public/flashcard/culture.png";
import Banner from "@/app/(user)/(study)/_ui/banner";
import { BannerTitle } from "@/ui/common/title";
const { Title } = Typography;

export default function FlashCardPage() {
    const topics = [
        {
            title: "Khoa học",
            image: scienceImage,
        },
        {
            title: "Nghiên cứu",
            image: researchImage,
        },
        {
            title: "Văn phòng",
            image: officeImage,
        },
        {
            title: "IT",
            image: itImage,
        },
        {
            title: "Văn học",
            image: literatureImage,
        },
        {
            title: "Văn hóa",
            image: cultureImage,
        },
    ];

    return (
        <div className="flashcard__page space-y-32">
            <Banner>
                <Image
                    className="max-w-60"
                    src={fcBannerImage}
                    alt="big tiawai 2"
                />

                <BannerTitle>Học Flashcard mỗi ngày theo chủ đề</BannerTitle>
            </Banner>

            <Row justify={"center"} gutter={[0, 40]}>
                <Title level={3}>
                    <i>
                        Tiawai cho phép bạn chọn{" "}
                        <b> chủ đề để học Flashcard </b>
                        hoặc bạn có thể{" "}
                        <b>
                            nhập vào đoạn văn sau đó tiawai sẽ giúp bạn trích
                            xuất các từ vụng dưới dạng Flashcard
                        </b>
                    </i>
                </Title>
                <Col span={24}></Col>

                <GenerateButton
                    className="mr-8 h-[6.5rem] min-w-[31.25rem]"
                    textStyle="text-3xl"
                    big={true}
                />

                <Col span={24}>
                    <Title>Các chủ đề</Title>
                </Col>

                <Col span={24}>
                    <div className="grid grid-cols-3 justify-items-center gap-12">
                        {topics.map((topic, index) => (
                            <Link
                                className={twMerge(
                                    "relative m-auto aspect-[2/1.5] w-full max-w-xl grow content-center rounded-xl text-center",
                                    index % 2 == 0
                                        ? "bg-[#E9DAE9]"
                                        : "bg-[#DAE3E9]",
                                )}
                                href={`/flashcard/${encodeURIComponent(topic.title)}`}
                                key={index}
                            >
                                <Title level={2}>{topic.title}</Title>
                                <div className="relative m-auto aspect-square w-2/5 content-center rounded-3xl bg-white/50 p-4">
                                    <Image
                                        className="m-auto aspect-square"
                                        src={topic.image}
                                        alt="tiawai chatbot icon"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}