'use client';
import Image from 'next/image';
import { Flex, Space, Typography } from 'antd';
import GenerateButton from '@/ui/generate-button';
import Banner from '@/app/(user)/(study)/_ui/banner';
import TestBox from '@/app/(user)/(study)/_ui/test-box';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import { BannerTitle } from '@/ui/common/title';
const { Title } = Typography;

const testsData = [
    {
        title: 'Luyện tập Phát Âm',
        examData: [
            {
                title: 'Đề thi minh họa THPT Quốc Gia 2023',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi minh họa THPT Quốc Gia 2023',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi minh họa THPT Quốc Gia 2023',
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
    {
        title: 'Luyện tập Trọng Âm',
        examData: [
            {
                title: 'Năm 2023 - Mã đề 401',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Năm 2023 - Mã đề 401',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Năm 2023 - Mã đề 401',
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
    {
        title: 'Luyện tập Ngữ Pháp',
        tag: '(câu hỏi đuôi, câu bị động, giới từ, loại từ, đại từ, mạo từ, thì động từ,...)',
        examData: [
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
    {
        title: 'Luyện tập Từ Vựng',
        tag: '(phrasal verb, idiom, collocation,word choice, đồng nghĩa - trái nghĩa...)',
        examData: [
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
    {
        title: 'Luyện tập Tình Huống Giao Tiếp',
        examData: [
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
    {
        title: 'Luyện tập Tìm Lỗi Sai',
        examData: [
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
    {
        title: 'Luyện tập Viết Lại Câu và Kết Hợp Câu',
        examData: [
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
            {
                title: 'Đề thi thử Liên Trường Nghệ An',
                duration: 90,
                totalAttempts: 100,
            },
        ],
    },
];

const Practice = () => {
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
                            Trải nghiệm tạo ra{' '}
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
            <Space direction="vertical" size={125}>
                {testsData.map((test, index) => (
                    <TestBox key={index} theme="blue" {...test} />
                ))}
            </Space>
        </div>
    );
};

export default Practice;
