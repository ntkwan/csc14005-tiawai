"use client";
import Image from "next/image";
import { Flex, Space, Typography } from "antd";
import GenerateButton from "@/ui/generate-button";
import Banner from "@/app/(user)/(study)/_ui/banner";
import TestBox from "@/app/(user)/(study)/_ui/test-box";
import bigTiawai2 from "@public/big-tiawai-2.svg";
import { BannerTitle } from "@/ui/common/title";
const { Title } = Typography;

const testsData = [
    {
        title: "Bộ Đề Minh Họa THPTQG Mới Nhất",
        description:
            "Bộ đề THPT Quốc gia môn Anh minh họa của Bộ Giáo dục và Đào tạo các năm gần đây. Ôn luyện để nắm vững format đề thi, các dạng bài thường xuyên xuất hiện.",
        examData: [
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi minh họa THPT Quốc Gia 2023",
                duration: 90,
                totalAttempts: 100,
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
                totalAttempts: 100,
            },
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Năm 2023 - Mã đề 401",
                duration: 90,
                totalAttempts: 100,
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
                totalAttempts: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: "Đề thi thử Liên Trường Nghệ An",
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
];

const Exam = () => {
    return (
        <div className="space-y-20">
            <Banner>
                <BannerTitle>
                    Luyện Thi Tiếng Anh THPT QG Hiệu Quả Mỗi Ngày Nhờ Test
                    Practice
                </BannerTitle>
                <Image
                    src={bigTiawai2}
                    alt="big tiawai 2"
                    height={400}
                    width={400}
                    style={{ width: "auto", height: "100%" }}
                />
            </Banner>

            <Flex align="center" className="mb-24">
                <Space size="large">
                    <Title className="!font-normal" level={2}>
                        <i>
                            Trải nghiệm tạo ra <b>bộ đề riêng</b> dựa trên năng
                            lực của bạn bằng <b>AI - Tia</b>
                        </i>
                    </Title>
                    <GenerateButton
                        className="mr-8 h-[6.5rem] min-w-[31.25rem]"
                        textStyle="text-3xl"
                        big={true}
                    />
                </Space>
            </Flex>

            <Title className="!mb-0 !font-roboto !capitalize">
                Danh sách bộ đề
            </Title>

            <div>
                <Space direction="vertical" size={144}>
                    {testsData.map((test, index) => (
                        <TestBox key={index} {...test} />
                    ))}
                </Space>
            </div>
        </div>
    );
};

export default Exam;
