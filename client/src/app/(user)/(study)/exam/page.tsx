import Image from "next/image";
import { Flex, Space } from "antd";
import Heading from "@/ui/heading";
import GenerateButton from "@/ui/generate-button";
import Banner from "@/app/(user)/(study)/_ui/banner";
import TestBox from "@/app/(user)/(study)/_ui/test-box";
import bigTiawai2 from "@public/big-tiawai-2.svg";

const testsData = [
    {
        title: "Bộ Đề Minh Họa THPTQG Mới Nhất",
        description:
            "Bộ đề THPT Quốc gia môn Anh minh họa của Bộ Giáo dục và Đào tạo các năm gần đây. Ôn luyện để nắm vững format đề thi, các dạng bài thường xuyên xuất hiện.",
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
        title: "Bộ Đề Thi Chính Thức Các Năm Mới Nhất",
        description:
            "Luyện đề thi thực chiến các năm để nâng cao kiến thức, trau dồi vốn từ, luyện nhuần nhuyễn chiến thuật làm bài thông minh.",
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
        title: "Bộ Đề Thi Thử Các Trường Nổi Tiếng Mới Nhất",
        description:
            "Bộ đề thi THPT Quốc gia môn Anh được chọn lọc tỉ mỉ, công phu nhất. Ôn luyện để nắm chắc format đề thi, trau dồi đủ kiến thức, giúp các sĩ tử tự tin chinh phục điểm số mục tiêu.",
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

const Exam = () => {
    return (
        <>
            <Banner className="mb-40">
                <Heading className="pl-28">
                    Luyện Thi Tiếng Anh THPT QG Hiệu Quả Mỗi Ngày Nhờ Test
                    Practice
                </Heading>
                <Image src={bigTiawai2} alt="big tiawai 2" />
            </Banner>
            <Flex align="center" className="mb-24">
                <Space size="large">
                    <h2 className="font-roboto text-[3.5rem] italic leading-[4.5rem] text-[#050C26]">
                        Trải nghiệm tạo ra{" "}
                        <span className="font-bold">bộ đề riêng</span> dựa trên
                        năng lực của bạn bằng{" "}
                        <span className="font-bold">AI - Tia</span>
                    </h2>
                    <GenerateButton
                        className="mr-8 h-[6.5rem] min-w-[31.25rem]"
                        textStyle="text-3xl"
                        big={true}
                    />
                </Space>
            </Flex>
            <h3 className="mb-[4.5rem] font-roboto text-6xl font-bold capitalize">
                Danh sách bộ đề
            </h3>
            <Space direction="vertical" size={144}>
                {testsData.map((test, index) => (
                    <TestBox key={index} {...test} />
                ))}
            </Space>
        </>
    );
};

export default Exam;
