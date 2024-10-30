"use client";

import { useState } from "react";
import { Checkbox, Modal } from "antd";

export default function TermAndPolicy() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Checkbox>
            Tôi đã đọc và chấp nhận{" "}
            <button
                className="inline text-[#0958d9] hover:underline hover:underline-offset-2"
                onClick={showModal}
            >
                điều khoản và chính sách.
            </button>
            <Modal
                title="Điều khoản và chính sách"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TermAndPolicyContent />
            </Modal>
        </Checkbox>
    );
}

const TermAndPolicyContent = () => {
    return (
        <>
            <h1>1. Hello world</h1>
            <p>2. Hello Tiawai</p>
        </>
    );
};
