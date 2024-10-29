import Image from "next/image";
import { ConfigProvider, FloatButton } from "antd";
import chatIcon from "@public/chat-icon.svg";

const ChatButton = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#5369A1",
                    fontSizeIcon: 48,
                    controlHeight: 56.8,
                },
            }}
        >
            <FloatButton
                icon={
                    <Image
                        src={chatIcon}
                        alt="Chat with us"
                        className="-ml-1"
                    />
                }
                type="primary"
                badge={{
                    count: 1,
                    showZero: false,
                    offset: ["-1rem", "0.125rem"],
                }}
                className="transition-all hover:scale-110"
            />
        </ConfigProvider>
    );
};

export default ChatButton;
