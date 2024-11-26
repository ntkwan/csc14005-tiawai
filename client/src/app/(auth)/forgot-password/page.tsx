"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, notification } from "antd";
import { FormLayout } from "@/ui/form";
import { FormTitle } from "@/ui/common/title";
const { Paragraph } = Typography;

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        setLoading(true);

        try {
            const response = { success: true };
            if (response.success) {
                notification.success({
                    message: "OTP đã được gửi",
                    description:
                        "Vui lòng kiểm tra email của bạn để nhận mã OTP.",
                });
                setOtpSent(true);
            } else {
                notification.error({
                    message: "Gửi OTP thất bại",
                    description: "Có lỗi xảy ra khi gửi OTP.",
                });
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            notification.error({
                message: "Gửi OTP thất bại",
                description: "Có lỗi xảy ra khi gửi OTP.",
            });
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        setLoading(true);

        try {
            const response = { success: true, message: "OTP hợp lệ" };

            if (response.success) {
                notification.success({
                    message: "OTP hợp lệ",
                    description:
                        "OTP chính xác! Bạn sẽ được chuyển tới trang đặt lại mật khẩu.",
                });
                router.push("/reset-password");
            } else {
                notification.error({
                    message: "OTP không hợp lệ",
                    description: response.message,
                });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            notification.error({
                message: "Lỗi xác thực OTP",
                description: "Có lỗi xảy ra khi xác thực OTP.",
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = () => {
        if (!otpSent) {
            sendOtp();
        } else {
            verifyOtp();
        }
    };

    return (
        <FormLayout>
            <Form
                form={form}
                name="forgot-password"
                layout="vertical"
                initialValues={{ remember: true }}
                autoComplete="off"
                size="large"
                onFinish={onFinish}
            >
                <FormTitle>Quên mật khẩu</FormTitle>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email không được bỏ trống",
                        },
                    ]}
                >
                    <Input
                        className="form__input"
                        placeholder="Email"
                        disabled={otpSent}
                    />
                </Form.Item>

                {otpSent && (
                    <Form.Item
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: "OTP không được bỏ trống",
                            },
                            {
                                len: 6,
                                message: "OTP phải gồm 6 chữ số",
                            },
                        ]}
                    >
                        <Input.OTP length={6} disabled={loading} />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button
                        className="!m-auto !block"
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        loading={loading}
                    >
                        {otpSent ? "Xác nhận OTP" : "Gửi OTP"}
                    </Button>
                </Form.Item>

                {!otpSent && (
                    <Paragraph style={{ textAlign: "center" }}>
                        Vui lòng nhập email để nhận mã OTP.
                    </Paragraph>
                )}
            </Form>
        </FormLayout>
    );
}
