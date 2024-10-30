"use client";
import FormLayout from "@/ui/form/form-layout";
import SubmitButton from "@/ui/form/submit-button";
import Link from "next/link";
import { Form, Input } from "antd";

export default function SignInPage() {
    return (
        <FormLayout className="form__sign-in" title="Đăng nhập">
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Tên đăng nhập/Email không được bỏ trống",
                    },
                ]}
            >
                <Input
                    className="form__input"
                    placeholder="Email"
                    style={{ boxShadow: "none" }}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
                <Input.Password
                    className="form__input"
                    placeholder="Mật khẩu"
                    style={{ boxShadow: "none", placeContent: "black" }}
                />
            </Form.Item>

            <p className="form__link--forgot-password mb-6 text-right hover:cursor-pointer hover:underline hover:underline-offset-2">
                <Link className="inline" href="forgot-password">
                    Quên mật khẩu?
                </Link>
            </p>

            <SubmitButton />

            <p className="form__nav text-center">
                Bạn chưa có tài khoản ?{" "}
                <Link
                    className="form__link--sign-up inline hover:underline hover:underline-offset-2"
                    href="/sign-up"
                >
                    <strong>Đăng ký</strong>
                </Link>
            </p>
        </FormLayout>
    );
}
