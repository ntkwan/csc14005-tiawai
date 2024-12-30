"use client";
import { useState } from "react";
import { Input, Button, Typography, Tabs, notification } from "antd";
import type { TabsProps } from "antd";
import { useParaphraseMutation } from "@/services/ai";

const { TextArea } = Input;
const { Title } = Typography;
const tabItems: TabsProps["items"] = [
    { key: "Paraphrase", label: "Tiêu chuẩn" },
    { key: "Fluency", label: "Trôi chảy" },
    { key: "Coherence", label: "Mạch lạc" },
    { key: "Simplification", label: "Thu gọn" },
    { key: "Formalize", label: "Trang trọng" },
    { key: "Neutralize", label: "Trung lập" },
];

export default function Paraphrasing() {
    const [inputText, setInputText] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("");
    const [tabItem, setTabItem] = useState<string>("Paraphrase");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paraphrase] = useParaphraseMutation();

    const onChangeTab = (key: string) => {
        setTabItem(key);
    };

    const isEnglish = (inputText: string) => {
        const regex = /[^\w\s~!$@#$%^&*(){}\[\]_+-=:;"'’<>.,?/ ]+/;
        return regex.test(inputText);
    };

    const splitInputText = (inputText: string) => {
        const textArr = inputText.split(".");
        const half = Math.ceil(textArr.length / 2);
        const firstHalf = textArr.slice(0, half).join(" ");
        const secondHalf = textArr.slice(half).join(" ");
        return [firstHalf, secondHalf];
    };

    const handleParaphrase = async () => {
        const [firstHalf, secondHalf] = splitInputText(inputText);
        const [res1, res2] = await Promise.all([
            paraphrase(`${tabItem} this: ${firstHalf}`),
            paraphrase(`${tabItem} this: ${secondHalf}`),
        ]);

        if (!res1.error && !res2.error) {
            setOutputText(`${res1.data?.data} ${res2.data?.data}`);
            return false;
        }
        return true;
    };

    const handleParaphraseWithRetry = async () => {
        if (isEnglish(inputText)) {
            notification.error({
                message: "Chỉ hỗ trợ tiếng Anh",
                description: "Vui lòng nhập hoặc sao chép văn bản tiếng Anh",
            });
            return;
        }

        setIsLoading(true);
        for (let i = 0; i < 5; i++) {
            const failed = await handleParaphrase();
            if (failed) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                continue;
            }
            return setIsLoading(false);
        }
        setIsLoading(false);
        notification.error({
            message: "Đã xảy ra lỗi",
            description: "Vui lòng thử lại sau",
        });
    };

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
                    onChange={onChangeTab}
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
                        minLength={200}
                        maxLength={1000}
                    />
                    <div className="absolute bottom-4 right-4 mt-4 flex justify-center">
                        <Button
                            className="!z-50 !bg-[#E9DAE9] !font-bold"
                            onClick={handleParaphraseWithRetry}
                            shape="round"
                            size="large"
                            loading={isLoading}
                        >
                            Paraphrasing
                        </Button>
                    </div>
                </div>
                <TextArea
                    className="!rounded-none !rounded-br-xl"
                    value={outputText}
                    autoSize={{ minRows: 20, maxRows: 20 }}
                    rows={24}
                    size="large"
                    showCount
                    maxLength={1000}
                    readOnly
                />
            </div>
        </div>
    );
}
