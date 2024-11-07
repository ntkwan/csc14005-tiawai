"use client";

import { ConfigProvider, App, notification } from "antd";

notification.config({
    placement: "topRight",
    showProgress: true,
    duration: 3,
    rtl: true,
});

export const theme = {
    token: {
        colorPrimary: "#4d2c5e",
        colorBgContainerDisabled: "#d4d4d8",
    },
};

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ConfigProvider theme={theme}>
            <App>{children}</App>
        </ConfigProvider>
    );
}
