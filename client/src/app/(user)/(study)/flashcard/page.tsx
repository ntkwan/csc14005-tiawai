import Link from "next/link";
import Image from "next/image";
import Heading from "@/ui/heading";
import Banner from "@/app/(user)/(study)/_ui/banner";
import fcBannerImage from "@public/flashcard/banner-img.png";
import GenerateButton from "@/ui/generate-button";
import { Row, Col } from "antd";
import { twMerge } from "tailwind-merge";

import scienceImage from "@public/flashcard/science.png";
import researchImage from "@public/flashcard/research.png";
import officeImage from "@public/flashcard/office.png";
import itImage from "@public/flashcard/it.png";
import literatureImage from "@public/flashcard/literature.png";
import cultureImage from "@public/flashcard/culture.png";

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
        <div className="flashcard__page">
            <Banner className="mb-40">
                <Image src={fcBannerImage} alt="big tiawai 2" />
                <Heading className="pl-28">
                    Học Flashcard mỗi ngày theo chủ đề
                </Heading>
            </Banner>

            <Row justify={"center"} gutter={[0, 40]}>
                <Col span={24}>
                    <h2 className="font-roboto text-[3.5rem] italic leading-[4.5rem] text-[#050C26]">
                        <i>
                            Tiawai cho phép bạn chọn{" "}
                            <b> chủ đề để học Flashcard </b>
                            hoặc bạn có thể{" "}
                            <b>
                                nhập vào đoạn văn sau đó tiawai sẽ giúp bạn
                                trích xuất các từ vụng dưới dạng Flashcard
                            </b>
                        </i>
                    </h2>
                </Col>

                <GenerateButton
                    className="mr-8 h-[6.5rem] min-w-[31.25rem]"
                    textStyle="text-3xl"
                    big={true}
                />

                <Col span={24}>
                    <h3 className="font-roboto text-4xl font-bold capitalize leading-none">
                        Các chủ đề
                    </h3>
                </Col>

                <Col span={24}>
                    <div className="grid grid-cols-3 justify-items-center gap-12">
                        {topics.map((topic, index) => (
                            <Link
                                className={twMerge(
                                    "m-autoc relative aspect-[2/1.5] w-full max-w-xl grow content-center rounded-xl text-center",
                                    index % 2 == 0
                                        ? "bg-[#E9DAE9]"
                                        : "bg-[#DAE3E9]",
                                )}
                                href={`/flashcard/${encodeURIComponent(topic.title)}`}
                                key={index}
                            >
                                <h4 className="mb-6 font-roboto text-3xl font-bold capitalize leading-none text-black">
                                    {topic.title}
                                </h4>
                                <div className="relative m-auto aspect-square w-2/5 content-center rounded-3xl bg-white/50 p-4">
                                    <Image
                                        className="m-auto aspect-square"
                                        src={topic.image}
                                        alt="tiawai chatbot icon"
                                        width={75}
                                        height={75}
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
