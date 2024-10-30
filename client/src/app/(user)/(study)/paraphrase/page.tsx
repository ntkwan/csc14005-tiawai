"use client";

import Image from "next/image";
import Heading from "@/ui/heading";
import Banner from "@/app/(user)/(study)/_ui/banner";
import bigTiawai from "@public/big-tiawai.svg";
import { Tabs, Input, Button } from "antd";
import { useState } from "react";
const { TextArea } = Input;
import "./page.css";

export default function ParaphrasePage() {
    return (
        <div className="paraphrase_page space-y-20">
            <Banner className="mb-40">
                <Heading className="pl-28">
                    Luyện Thi Tiếng Anh THPT QG Hiệu Quả Mỗi Ngày Nhờ Test
                    Practice
                </Heading>
                <Image src={bigTiawai} alt="big tiawai" />
            </Banner>

            <h2 className="paraphrase__description font-roboto text-[3.5rem] italic leading-[4.5rem] text-[#050C26]">
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
            </h2>
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
        <div className="m-auto w-4/5 rounded-xl border border-black">
            <div className="flex translate-y-4 items-start justify-center gap-4 px-4">
                <p className="mt-3 min-w-max rounded-full bg-[#DAE3E9] px-4 py-1 text-2xl font-bold">
                    Chế Độ:{" "}
                </p>
                <Tabs
                    defaultActiveKey="standard"
                    style={{ margin: "0", fontSize: "20px" }}
                    items={tabItems}
                    size="large"
                />
            </div>
            <div className="flex">
                <div className="relative flex-1">
                    <TextArea
                        className="paraphrase__text-area rounded-none rounded-bl-xl border-black p-4 text-xl"
                        placeholder="Để viết lại câu, viết hoặc sao chép vào đây, sau đó nhấn Paraphrase"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        autoSize={{ minRows: 16 }}
                    />
                    <div className="absolute bottom-4 right-4 mt-4 flex justify-center">
                        <Button
                            className="!rounded-full !border-none !bg-[#E9DAE9] !px-8 !py-6 !text-xl !font-bold !text-black"
                            onClick={handleParaphrase}
                        >
                            Paraphrasing
                        </Button>
                    </div>
                </div>
                <TextArea
                    className="paraphrase__text-area flex-1 rounded-none rounded-br-xl border-black p-4"
                    autoSize={{ minRows: 16 }}
                />
            </div>
        </div>
    );
};
