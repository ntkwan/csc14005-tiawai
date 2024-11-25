"use client";
import { useState } from "react";
import Image from "next/image";
import Banner from "@/app/(user)/(study)/_ui/banner";
import { BannerTitle } from "@/ui/common/title";
import bigTiawai from "@public/big-tiawai.svg";
import { Tabs, Input, Button, Typography } from "antd";
const { Title } = Typography;
const { TextArea } = Input;

export default function ParaphrasePage() {
    return (
        <div className="paraphrase_page mb-10 space-y-20">
            <Banner>
                <BannerTitle>Công cụ Paraphrasing bằng AI</BannerTitle>
                <Image
                    className="scale-150"
                    src={bigTiawai}
                    alt="big tiawai"
                    height={350}
                />
            </Banner>

            <Title level={3}>
                <i>
                    Công cụ paraphrasing hoạt động cùng bạn để giúp bạn tạo ra
                    <b> những bài viết rõ ràng, mạch lạc và chuyên nghiệp </b>
                    trong một khoảng
                    <b> thời gian ngắn. </b>
                    Tia - AI của chúng tôi ngay lập tức diễn đạt lại đoạn văn
                    của bạn
                    <b>
                        {" "}
                        mà không làm thay đổi ý nghĩa hay chất lượng của từ ngữ.
                    </b>
                </i>
            </Title>
            <Paraphrasing />
        </div>
    );
}

const Paraphrasing = () => {
    const [inputText, setInputText] = useState("");

    const handleParaphrase = () => {
        console.log("Paraphrasing text:", inputText);
    };

    const tabItems = [
        { key: "standard", label: "Tiêu chuẩn" },
        { key: "concise", label: "Thu gọn" },
        { key: "natural", label: "Tự nhiên" },
        { key: "fluent", label: "Trôi chảy" },
        { key: "academic", label: "Học thuật" },
        { key: "formal", label: "Trang trọng" },
    ];

    return (
        <div className="m-auto rounded-xl border border-black">
            <div className="flex translate-y-4 items-start justify-center gap-4 px-4">
                <Title
                    className="!mt-3 rounded-full bg-[#DAE3E9] px-4 py-1 !font-bold"
                    level={5}
                >
                    Chế Độ:
                </Title>
                <Tabs
                    defaultActiveKey="standard"
                    items={tabItems}
                    size="large"
                />
            </div>
            <div className="grid grid-cols-2">
                <div className="relative">
                    <TextArea
                        className="!rounded-none !rounded-bl-xl"
                        placeholder="Để viết lại câu, viết hoặc sao chép vào đây, sau đó nhấn Paraphrase"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        autoSize={{ minRows: 20, maxRows: 20 }}
                        size="large"
                        showCount
                        maxLength={1000}
                    />
                    <div className="absolute bottom-4 right-4 mt-4 flex justify-center">
                        <Button
                            className="!z-50 !bg-[#E9DAE9] !font-bold"
                            onClick={handleParaphrase}
                            shape="round"
                            size="large"
                        >
                            Paraphrasing
                        </Button>
                    </div>
                </div>
                <TextArea
                    className="!rounded-none !rounded-br-xl"
                    autoSize={{ minRows: 20, maxRows: 20 }}
                    rows={24}
                    size="large"
                    showCount
                    maxLength={1000}
                />
            </div>
        </div>
    );
};
