import { Row, Col } from "antd";
import ExamFrame from "@/ui/exam-frame";
import { twMerge } from "tailwind-merge";

interface TestBoxProps {
    title: string;
    description?: string;
    tag?: string;
    theme?: "pink" | "blue";
    examData: Exam[];
}

const TestBox = (props: Readonly<TestBoxProps>) => {
    return (
        <div className="rounded-[80px] border-4 border-black px-24 pb-14 pt-6">
            <h4 className="-ml-4 mb-2 font-roboto text-[3.125rem] font-medium text-[#050C26]">
                {props.title}{" "}
                <span className="text-xl font-light italic">{props.tag}</span>
            </h4>
            <p
                className={twMerge(
                    "font-roboto text-3xl font-medium text-[#8A8A8A]",
                    props.description ? "mb-12" : "invisible h-0",
                )}
            >
                {props.description
                    ? props.description
                    : "Bộ đề THPT Quốc gia môn Anh minh họa của Bộ Giáo dục và Đào tạo các năm gần đây. Ôn luyện để nắm vững format đề thi, các dạng bài thường xuyên xuất hiện."}
            </p>
            <Row gutter={[136, 55]}>
                {props.examData.map((exam, index) => (
                    <Col span={8} key={index}>
                        <ExamFrame theme={props.theme} examData={exam} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TestBox;
