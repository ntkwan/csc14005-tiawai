"use client";
import { Button, Form } from "antd";
import { backgroundGradient } from "./btn-bg-gradient";
import { RightOutlined } from "@ant-design/icons";

export const ButtonGradient = ({ loading }: { loading?: boolean }) => {
    const { styles } = backgroundGradient();

    return (
        <Form.Item>
            <Button
                className={`${styles.linearGradientButton} f!relative !m-auto !flex !min-h-14 !min-w-14 !items-center !rounded-full`}
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={
                    <RightOutlined className="aspect-square min-h-max min-w-max text-3xl" />
                }
            />
        </Form.Item>
    );
};
