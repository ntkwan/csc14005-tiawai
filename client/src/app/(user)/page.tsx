"use client";
import { Col, Flex, Row, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import IconFrame from "@/ui/icon-frame";
import ExamFrame from "@/ui/exam-frame";
import GenerateButton from "@/ui/generate-button";
import homeMainImg from "@public/home-main-img.svg";
import home7Svg from "@public/home-7.svg";
import bigTiawai from "@public/big-tiawai.svg";
import homeIconBg2 from "@public/home-icon-bg-2.svg";
import home11 from "@public/home-11.png";

const examData = [
    {
        key: "exam",
        type: "Bộ đề Thi THPTQG",
        tests: [
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
        ],
    },
    {
        key: "practice",
        type: "Bài luyện tập",
        tests: [
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 0,
                totalAttempt: 0,
            },
        ],
    },
];

const mainHighlights = [
    {
        src: "/home-9.png",
        alt: "home icon 9",
        title: "Dễ dàng sử dụng",
        description: "Thao tác đơn giản",
    },
    {
        src: "/home-10.png",
        alt: "home icon 10",
        title: "Trải nghiệm học vui vẻ",
        description:
            "Các bài tập dưới dạng trò chơi mang lại trải nghiệm khác biệt",
    },
];

import homeGradientBg from "@public/home-gradient-bg.svg";
import Heading from "@/ui/heading";
import FeaturesBox from "@/ui/features-box";

export default function Home() {
    return (
        <main>
            <Image
                src={homeGradientBg}
                alt="home gradient bg"
                className="absolute bottom-0 left-0 right-0 top-0 -z-50"
            />
            <Flex className="bg-[url('/home-icon-bg.svg')] px-28 py-[7.5rem]">
                <Flex vertical>
                    <Heading>
                        Nền tảng luyện thi THPTQG môn Tiếng Anh cùng với AI
                    </Heading>
                    <p className="pr-12 text-justify text-xl text-[#8A8A8A]">
                        <span className="font-chango text-[1.375rem] leading-[2.375rem]">
                            tiawai
                        </span>{" "}
                        cung cấp đầy đủ nội dung chất lượng gồm các đề luyện thi
                        có sẵn và tạo ra bởi công nghệ AI, các bài luyện tập
                        theo chủ đề, hỗ trợ paraphrase đoạn văn, flashcard mỗi
                        ngày cùng với đó là Tia
                    </p>
                </Flex>
                <Image src={homeMainImg} alt="home main image" />
            </Flex>
            <FeaturesBox />
            <Flex className="mb-28" vertical>
                <Space size={112} direction="vertical">
                    {examData.map((exam, index) => (
                        <div key={index}>
                            <Space size={40}>
                                <h2 className="pl-16 text-6xl font-bold">
                                    {exam.type}
                                </h2>
                                <GenerateButton />
                            </Space>
                            <Flex align="end" justify="end">
                                <Link
                                    href={`/${exam.key}`}
                                    className="mb-8 flex justify-end rounded-full px-4 py-1 font-roboto text-xl font-medium text-black transition duration-500 ease-in-out hover:bg-slate-300 hover:text-black"
                                >
                                    Xem thêm &gt;
                                </Link>
                            </Flex>
                            <Row justify="space-between">
                                {exam.tests.map((test, index) => (
                                    <Col span={5} key={index}>
                                        <ExamFrame examData={test} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </Space>
            </Flex>
            <Flex className="relative mb-52">
                <Space size="large">
                    <Image src={bigTiawai} alt="big tiawai" loading="lazy" />
                    <Flex className="text-[#050C26]" vertical justify="center">
                        <Space direction="vertical" size={46}>
                            <h2 className="font-roboto text-7xl font-bold">
                                Trải nghiệm học cùng Tia
                            </h2>
                            {mainHighlights.map((highlight, index) => (
                                <Flex align="center" key={index}>
                                    <Space size="large">
                                        <IconFrame
                                            bgColor="#0E0314"
                                            src={highlight.src}
                                            alt={highlight.alt}
                                            width={52}
                                            height={52}
                                        />
                                        <Flex
                                            vertical
                                            className="font-roboto font-medium"
                                        >
                                            <Space
                                                direction="vertical"
                                                size="middle"
                                            >
                                                <h3 className="text-3xl">
                                                    {highlight.title}
                                                </h3>
                                                <p className="text-2xl text-[#8A8A8A]">
                                                    {highlight.description}
                                                </p>
                                            </Space>
                                        </Flex>
                                    </Space>
                                </Flex>
                            ))}
                        </Space>
                    </Flex>
                </Space>
                <Image
                    className="absolute left-12 top-[43%]"
                    loading="lazy"
                    src={homeIconBg2}
                    alt="home icon bg 2"
                />
                <Image
                    className="absolute -bottom-48 -left-10 rotate-180"
                    loading="lazy"
                    src={home7Svg}
                    alt="home icon 7"
                />
                <Image
                    className="absolute -bottom-36 -right-10"
                    loading="lazy"
                    src={home11}
                    alt="home icon 11"
                />
            </Flex>
            <Flex justify="center" className="">
                <Space size={91}>
                    <Flex
                        className="max-w-[650px] rounded-[2rem] bg-[#E9DAE9] px-56 py-5"
                        justify="center"
                    >
                        <Space direction="vertical" size="large" align="center">
                            <h3 className="font-roboto text-5xl font-bold">
                                Paraphasing
                            </h3>
                            <IconFrame
                                src="/home-3.svg"
                                alt="home icon 3"
                                width={90}
                                height={90}
                                frameSize="200px"
                                bgColor="#FFFFFF80"
                                lazy={true}
                            ></IconFrame>
                            <Link
                                href="/paraphrase"
                                className="cursor-pointer rounded-full bg-[#4D2C5E] px-4 py-1 font-roboto text-lg font-medium text-white hover:text-white"
                            >
                                Xem thêm
                            </Link>
                        </Space>
                    </Flex>
                    <Flex
                        className="max-w-[650px] rounded-[2rem] bg-[#DAE3E9] px-56 py-5"
                        justify="center"
                    >
                        <Space direction="vertical" align="center" size="large">
                            <h3 className="font-roboto text-5xl font-bold">
                                Flashcard
                            </h3>
                            <IconFrame
                                src="/home-5.svg"
                                alt="home icon 3"
                                width={150}
                                height={100}
                                frameSize="200px"
                                bgColor="#FFFFFF80"
                                lazy={true}
                            ></IconFrame>
                            <Link
                                href="/flashcard"
                                className="cursor-pointer rounded-full bg-[#2C2F5E] px-4 py-1 font-roboto text-lg font-medium text-white hover:text-white"
                            >
                                Xem thêm
                            </Link>
                        </Space>
                    </Flex>
                </Space>
            </Flex>
        </main>
    );
}
