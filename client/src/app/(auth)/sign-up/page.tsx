"use client";
import FormLayout from "@/ui/form/form-layout";
import SubmitButton from "@/ui/form/submit-button";
import TermAndPolicy from "@/ui/auth/term-and-policy";
import { Form, Input } from "antd";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <FormLayout className="form__sign-up" title="Đăng ký">
            <Form.Item
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: "Họ không được bỏ trống",
                    },
                ]}
            >
                <Input className="form__input" placeholder="Họ" />
            </Form.Item>

            <Form.Item
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: "Tên không được bỏ trống",
                    },
                ]}
            >
                <Input className="form__input" placeholder="Tên" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Email không được bỏ trống",
                    },
                ]}
            >
                <Input className="form__input" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
                <Input.Password
                    className="form__input"
                    placeholder="Mật khẩu"
                />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(
                                      new Error(
                                          "Bạn phải chấp nhận điều khoản và chính sách",
                                      ),
                                  ),
                    },
                ]}
            >
                <TermAndPolicy />
            </Form.Item>

            <SubmitButton />

            <p className="text-center">
                Bạn đã là thành viên ?{" "}
                <Link
                    className="inline hover:underline hover:underline-offset-2"
                    href="sign-in"
                >
                    <strong>Đăng Nhập</strong>
                </Link>
            </p>
        </FormLayout>
    );
}
