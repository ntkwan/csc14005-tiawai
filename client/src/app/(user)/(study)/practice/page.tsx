"use client";
import Image from "next/image";
import { Empty, Flex, Space, Typography } from "antd";
import GenerateButton from "@/ui/generate-button";
import Banner from "@/app/(user)/(study)/_ui/banner";
import TestBox from "@/app/(user)/(study)/_ui/test-box";
import bigTiawai2 from "@public/big-tiawai-2.svg";
import { BannerTitle } from "@/ui/common/title";
const { Title } = Typography;
import { useGetExamPracticesQuery } from "@/services/exam";

const Practice = () => {
    const { data: practiceData, isLoading } = useGetExamPracticesQuery();
    if (isLoading) return null;

    const testsData = [
        {
            title: "Chuyên đề của bạn",
            examData: practiceData,
        },
    ];

    return (
        <div className="select-none space-y-32">
            <Banner>
                <Image src={bigTiawai2} alt="big tiawai 2" height={400} />
                <BannerTitle>
                    Luyện thi hiệu quả với các chuyên đề Tiếng Anh
                </BannerTitle>
            </Banner>
            <Flex align="center" className="mb-24">
                <Space size="large">
                    <Title className="!font-normal" level={2}>
                        <i>
                            Trải nghiệm tạo ra{" "}
                            <b>bộ đề riêng theo dạng mà bạn mong muốn</b> dựa
                            trên năng lực của bạn bằng <b>AI - Tia</b>
                        </i>
                    </Title>
                    <GenerateButton
                        className="mr-8 h-[6.5rem] min-w-[31.25rem]"
                        textStyle="text-3xl"
                        big={true}
                    />
                </Space>
            </Flex>
            <Space className="w-full" direction="vertical" size={125}>
                {testsData[0].examData?.length ? (
                    testsData.map((test, index) => (
                        <TestBox key={index} theme="blue" {...test} />
                    ))
                ) : (
                    <Empty
                        className="!m-auto"
                        description="Không có dữ liệu"
                        imageStyle={{ height: 100 }}
                    />
                )}
            </Space>
        </div>
    );
};

export default Practice;
