import Image from "next/image";
import { Flex, Space } from "antd";
import Heading from "@/ui/heading";
import GenerateButton from "@/ui/generate-button";
import Banner from "@/app/(user)/(study)/_ui/banner";
import TestBox from "@/app/(user)/(study)/_ui/test-box";
import bigTiawai2 from "@public/big-tiawai-2.svg";

const testsData = [
    {
        title: "Luyện tập Phát Âm",
        examData: [
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Trọng Âm",
        examData: [
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Ngữ Pháp",
        tag: "(câu hỏi đuôi, câu bị động, giới từ, loại từ, đại từ, mạo từ, thì động từ,...)",
        examData: [
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Từ Vựng",
        tag: "(phrasal verb, idiom, collocation,word choice, đồng nghĩa - trái nghĩa...)",
        examData: [
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Tình Huống Giao Tiếp",
        examData: [
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Đọc - Điền Từ",
        examData: [
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Đọc - Hiểu",
        examData: [
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Tìm Lỗi Sai",
        examData: [
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
    {
        title: "Luyện tập Viết Lại Câu và Kết Hợp Câu",
        examData: [
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempt: 100,
            },
        ],
    },
];

const Practice = () => {
    return (
        <>
            <Banner className="mb-40 max-h-[434px]">
                <Image
                    src={bigTiawai2}
                    alt="big tiawai 2"
                    className="ml-10 !h-[542px] overflow-visible"
                    height={542}
                />
                <Heading className="pl-14">
                    Luyện Thi Tiếng Anh THPTQG qua các bài tập theo dạng
                </Heading>
            </Banner>
            <Flex align="center" className="mb-24">
                <Space size="large">
                    <h2 className="font-roboto text-[3.5rem] italic leading-[4.5rem] text-[#050C26]">
                        Trải nghiệm tạo ra{" "}
                        <span className="font-bold">
                            bộ đề riêng theo dạng mà bạn mong muốn
                        </span>{" "}
                        dựa trên năng lực của bạn bằng{" "}
                        <span className="font-bold">AI - Tia</span>
                    </h2>
                    <GenerateButton
                        className="mr-8 h-[6.5rem] min-w-[31.25rem]"
                        textStyle="text-3xl"
                        big={true}
                    />
                </Space>
            </Flex>
            <Space direction="vertical" size={125}>
                {testsData.map((test, index) => (
                    <TestBox key={index} theme="blue" {...test} />
                ))}
            </Space>
        </>
    );
};

export default Practice;
