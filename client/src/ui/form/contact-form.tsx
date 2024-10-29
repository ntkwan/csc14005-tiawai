"use client";

import { Form, Input, Button } from "antd";

export default function ContactForm() {
    return (
        <>
            <Form.Item
                name="fullname"
                rules={[
                    {
                        required: true,
                        message: "Họ và tên không được bỏ trống",
                    },
                ]}
            >
                <Input
                    className="form__input"
                    placeholder="Họ và tên"
                    style={{ boxShadow: "none" }}
                />
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
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Số điện thoại không được bỏ trống",
                    },
                ]}
            >
                <Input className="form__input" placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item
                name="content"
                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
            >
                <Input className="form__input" placeholder="Nội dung" />
            </Form.Item>

            <Form.Item>
                <Button
                    className="form__button"
                    type="primary"
                    htmlType="submit"
                >
                    Gửi nội dung
                </Button>
            </Form.Item>
        </>
    );
}
