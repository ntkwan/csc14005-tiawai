import { Flex, Space } from "antd";
import IconFrame from "./icon-frame";
import Image from "next/image";

const examInfo = [
    {
        src: "/clock.svg",
        alt: "clock",
    },
    {
        src: "/download.svg",
        alt: "download",
    },
];

const ExamFrame = ({
    theme = "pink",
    examData,
}: Readonly<{
    theme?: "pink" | "blue";
    examData: Exam;
}>) => {
    const iconSrc = theme === "pink" ? "/home-8.svg" : "/home-4.png";
    const iconAlt = theme === "pink" ? "home icon 8" : "home icon 4";
    const bgColor = theme === "pink" ? "#E9DAE9" : "#DAE3E9";
    const objColor = theme === "pink" ? "#4D2C5E" : "#2C2F5E";
    const size = theme === "pink" ? 100 : 62;
    const { title, duration, totalAttempt } = examData;
    return (
        <Flex
            className="rounded-xl p-4"
            style={{
                backgroundColor: bgColor,
                boxShadow: "0px 4px 25px 0px rgba(0,0,0,0.10)",
            }}
            align="center"
        >
            <Space size={29}>
                <IconFrame
                    bgColor={objColor}
                    src={iconSrc}
                    alt={iconAlt}
                    width={size}
                    height={size}
                    className="py-4"
                />
                <Flex vertical>
                    <h3 className="mb-2 max-w-56 font-roboto text-xl font-medium">
                        {title}
                    </h3>
                    <Flex className="mb-4">
                        <Space size={32}>
                            {examInfo.map((info, index) => (
                                <Flex align="center" key={index}>
                                    <Space>
                                        <Image
                                            src={info.src}
                                            alt={info.alt}
                                            width={18}
                                            height={18}
                                        ></Image>
                                        <span className="font-roboto font-medium text-[#ACACAC]">
                                            {info.alt === "clock"
                                                ? `${duration} phút`
                                                : `${totalAttempt} lượt làm`}
                                        </span>
                                    </Space>
                                </Flex>
                            ))}
                        </Space>
                    </Flex>
                    <div>
                        <span
                            className="cursor-pointer rounded-full px-4 py-1 font-roboto text-sm font-medium text-white"
                            style={{ backgroundColor: objColor }}
                        >
                            Xem bài test
                        </span>
                    </div>
                </Flex>
            </Space>
        </Flex>
    );
};

export default ExamFrame;
