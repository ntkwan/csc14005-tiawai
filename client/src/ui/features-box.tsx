import { Col, Flex, Row } from "antd";
import IconFrame from "./icon-frame";
import Image from "next/image";
import home7Svg from "@public/home-7.svg";
import home7Png from "@public/home-7.png";
import { twMerge } from "tailwind-merge";

const mainFeatures = [
    {
        src: "/home-1.png",
        alt: "home icon 1",
        title: "Luyện từng dạng bài tập",
        description:
            "Cung cấp kho bài tập khổng lồ tự các nguồn chính thống và do AI tạo ra",
    },
    {
        src: "/home-2.svg",
        alt: "home icon 2",
        title: "Chatbox với Tia",
        description:
            "Tia hỗ trợ giải đáp các câu hỏi, dịch nghĩa từ cùng vô vàn những sự hỗ trợ khác như đánh giá quá trình học tập của bạn",
    },
    {
        src: "/home-3.svg",
        alt: "home icon 3",
        title: "Paraphrase",
        description:
            "Hỗ trợ viết lại câu hoặc đoạn văn bằng từ ngữ, ngữ pháp, và cấu trúc câu khác những vẫn giữ nguyên ý nghĩa câu",
    },
    {
        src: "/home-4.png",
        alt: "home icon 4",
        title: "Luyện đề thi",
        description:
            "Đề thi THPTQG với trải nghiệm thi thật và kho đề chính thống và do AI tạo ra kèm giải thích chi tiết",
    },
    {
        src: "/home-5.svg",
        alt: "home icon 5",
        title: "Flashcard",
        description:
            "Cung cấp mỗi ngày 10 từ vựng cho bạn bằng phương pháp Flashcard",
    },
    {
        src: "/home-6.svg",
        alt: "home icon 6",
        title: "Dịch từ",
        description:
            "Hỗ trợ dịch ngôn ngữ Anh-Việt, cung cấp đầy đủ phát âm, loại từ, ví dụ đi kèm,...",
    },
];

const FeaturesBox = ({ className = "" }: Readonly<{ className?: string }>) => {
    return (
        <Flex className={twMerge("relative mb-36 justify-center", className)}>
            <div className="max-h-[26.75rem] max-w-[89.5rem] rounded-xl bg-[rgba(83,105,161,0.7)] p-8">
                <div className="relative mb-16 content-center text-center text-5xl font-black text-[#050C26]">
                    <div className="absolute left-[61%] top-[55%] h-[3.75rem] w-[3.75rem] content-center rounded-full bg-[rgba(217,217,217,0.3)] text-white">
                        ?
                    </div>
                    <span className="font-chango font-normal text-[#F5F6FC]">
                        tiawai
                    </span>{" "}
                    có gì
                </div>
                <Row gutter={[4, 24]}>
                    {mainFeatures.map((feature, index) => (
                        <Col span={8} key={index}>
                            <Row>
                                <Col span={6}>
                                    <IconFrame
                                        src={feature.src}
                                        alt={feature.alt}
                                        bgColor="rgba(255,255,255,0.2)"
                                    />
                                </Col>
                                <Col span={16}>
                                    <h3 className="mb-2 text-2xl font-bold text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="font-roboto text-sm font-medium text-white/60">
                                        {feature.description}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </Row>
            </div>
            <Image
                src={home7Svg}
                alt="home icon 7"
                className="absolute -bottom-8 -right-8"
            ></Image>
            <Image
                src={home7Png}
                alt="home icon 7"
                className="absolute -bottom-8 left-0"
            ></Image>
        </Flex>
    );
};

export default FeaturesBox;
