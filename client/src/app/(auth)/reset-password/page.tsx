"use client";
import { useRouter } from "next/navigation";
import { Form, Input, Button, notification } from "antd";
import FormLayout from "@/ui/form/form-layout";
import { FormTitle } from "@/ui/common/title";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [form] = Form.useForm();

    const onFinish = async () => {
        const { password, confirmPassword } = form.getFieldsValue();

        if (password !== confirmPassword) {
            notification.error({
                message: "Lỗi xác nhận mật khẩu",
                description: "Mật khẩu xác nhận không khớp với mật khẩu.",
            });
            return;
        }

        try {
            const response = { success: true };

            if (response.success) {
                notification.success({
                    message: "Khôi phục mật khẩu thành công",
                    description:
                        "Mật khẩu của bạn đã được thay đổi. Hãy đăng nhập lại.",
                });
                router.push("/sign-in");
            } else {
                notification.error({
                    message: "Khôi phục mật khẩu thất bại",
                    description: "Có lỗi xảy ra.",
                });
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            notification.error({
                message: "Lỗi khôi phục mật khẩu",
                description: "Có lỗi xảy ra khi đặt lại mật khẩu.",
            });
        }
    };

    return (
        <FormLayout>
            <Form
                form={form}
                name="reset-password"
                layout="vertical"
                initialValues={{ remember: true }}
                autoComplete="off"
                size="large"
                onFinish={onFinish}
            >
                <FormTitle>Khôi phục mật khẩu</FormTitle>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                        {
                            min: 6,
                            message: "Mật khẩu phải có ít nhất 6 ký tự",
                        },
                    ]}
                >
                    <Input.Password
                        className="form__input"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Mật khẩu xác nhận không khớp"),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        className="form__input"
                        placeholder="Xác nhận mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        className="!m-auto !block"
                        type="primary"
                        htmlType="submit"
                    >
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </FormLayout>
    );
}
