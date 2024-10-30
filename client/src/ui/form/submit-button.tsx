"use client";
import { Button, Form } from "antd";
import { backgroundGradient } from "./btn-bg-gradient";
import { RightOutlined } from "@ant-design/icons";

export default function SubmitButton() {
    const { styles } = backgroundGradient();

    return (
        <Form.Item>
            <Button
                className={`${styles.linearGradientButton} form__button--auth`}
                type="primary"
                htmlType="submit"
                icon={
                    <RightOutlined className="aspect-square min-h-max min-w-max text-3xl" />
                }
            />
        </Form.Item>
    );
}
