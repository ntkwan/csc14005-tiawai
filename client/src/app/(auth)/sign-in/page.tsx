"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/hooks/hook";
import { useSignInMutation } from "@/lib/api/auth-api";
import { setCredentials } from "@/app/lib/slices/auth-slice";
import { Form, Input, Typography, notification } from "antd";
import FormLayout from "@/ui/form/form-layout";
import { FormTitle } from "@/ui/common/title";
import ButtonGradient from "@/ui/form/submit-button";
const { Paragraph, Link } = Typography;

export default function SignInPage() {
    const dispatch = useAppDispatch();
    const [SignIn, { data, error, isLoading }] = useSignInMutation();
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async () => {
        const formData = form.getFieldsValue();
        await SignIn(formData);

        if (error) {
            notification.error({
                message: "Đăng nhập thất bại",
                description:
                    "Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.",
            });
        } else if (data?.accessToken && data?.refreshToken) {
            dispatch(
                setCredentials({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                }),
            );

            notification.success({
                message: "Đăng nhập thành công",
                description: "Chào mừng bạn trở lại với Tiawai",
            });

            setTimeout(() => {
                router.push("/");
            }, 3000);
        }
    };

    return (
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
                        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                    ]}
                >
                    <Input.Password
                        className="form__input"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Paragraph className="!text-end">
                    <Link href="forgot-password">Quên mật khẩu?</Link>
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
    );
}
