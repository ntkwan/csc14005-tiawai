"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Typography, notification } from "antd";
import { FormLayout, ButtonGradient } from "@/ui/form";
import { FormTitle } from "@/ui/common/title";
const { Paragraph } = Typography;
import { signIn } from "next-auth/react";

export default function SignInPage() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async () => {
        const formData = form.getFieldsValue();

        setIsLoading(true);
        const res = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
        });
        setIsLoading(false);

        if (res !== undefined && !res?.error) {
            notification.success({
                message: "Đăng nhập thành công",
                description: "Chào mừng bạn trở lại với Tiawai",
            });
            router.push("/");
        } else {
            notification.error({
                message: "Đăng nhập thất bại",
                description:
                    "Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.",
            });
        }
    };

    return (
        <>
            <FormLayout>
                <Form
                    form={form}
                    name="sign-in"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    size="large"
                    onFinish={onFinish}
                >
                    <FormTitle>Đăng nhập</FormTitle>

                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Email không được bỏ trống",
                            },
                            {
                                type: "email",
                                message: "Vui lòng nhập địa chỉ email hợp lệ",
                            },
                        ]}
                    >
                        <Input className="form__input" placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu không được bỏ trống",
                            },
                            {
                                min: 5,
                                message: "Mật khẩu phải có ít nhất 5 ký tự",
                            },
                        ]}
                    >
                        <Input.Password
                            className="form__input"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    <Paragraph className="!text-end">
                        <Link href="forgot-password">
                            <strong>Quên mật khẩu?</strong>
                        </Link>
                    </Paragraph>

                    <Form.Item>
                        <ButtonGradient loading={isLoading} />
                    </Form.Item>

                    <Paragraph className="!text-center">
                        Bạn chưa có tài khoản?{" "}
                        <Link href="sign-up">
                            <strong>Đăng ký</strong>
                        </Link>
                    </Paragraph>
                </Form>
            </FormLayout>
        </>
    );
}
