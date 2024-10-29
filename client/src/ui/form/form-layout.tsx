import Image from "next/image";
import circle1 from "./circle-1.png";
import circle2 from "./circle-2.png";
import TiawaiMascot from "@/ui/tiawai-mascot";
import Title from "antd/es/typography/Title";
import { twMerge } from "tailwind-merge";
import { Form } from "antd";

export default function FormLayout({
    className,
    title,
    children,
}: {
    className: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <div
                className={twMerge(
                    "form__layout relative m-auto flex min-h-[600px] w-full max-w-3xl overflow-clip rounded-3xl p-12 shadow-xl",
                    className.match(/bg-/) ? className : "bg-white",
                )}
            >
                <FormBackground />
                <TiawaiMascot />
                <Form
                    className="form flex-[1.3] content-center"
                    // name="signIn"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    //   onFinish={onFinish}
                    //   onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                >
                    <Title className="form__title text-center" level={1}>
                        {title}
                    </Title>
                    <div className="form__content">{children}</div>
                </Form>
            </div>
        </>
    );
}

const FormBackground = () => {
    return (
        <>
            <Image
                className="absolute left-[15%] top-0"
                src={circle1}
                alt="circle1"
                width={225}
                height={225}
            />

            <Image
                className="absolute left-0 top-[15%]"
                src={circle2}
                alt="circle2"
                width={150}
                height={150}
            />
        </>
    );
};
