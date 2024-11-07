import type { Meta, StoryObj } from "@storybook/react";
import Button from "../ui/common/button";

const meta: Meta<typeof Button> = {
    title: "Example/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        backgroundColor: { control: "color" },
        onClick: { action: "clicked" },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: "primary",
        children: "Primary Button",
    },
};

export const Default: Story = {
    args: {
        children: "Default Button",
    },
};

export const Large: Story = {
    args: {
        size: "large",
        children: "Large Button",
    },
};

export const Middle: Story = {
    args: {
        size: "middle",
        children: "Middle Button",
    },
};

export const Small: Story = {
    args: {
        size: "small",
        children: "Small Button",
    },
};
