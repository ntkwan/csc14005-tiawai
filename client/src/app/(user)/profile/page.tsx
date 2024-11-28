"use client";
import { useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
// import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/app/lib/api/auth-api';
// import { UserProfile, UpdateProfilePayload } from '@/app/types';
// types.ts
export interface UserProfile {
    name: string;
    email: string;
    phoneNumber: string;
    gender: "male" | "female";
    dateOfBirth: string; // Bạn có thể sử dụng kiểu Date nếu cần
    address: string;
}

export interface UpdateProfilePayload {
    name?: string;
    email?: string;
    phoneNumber?: string;
    gender?: "male" | "female";
    dateOfBirth?: string;
    address?: string;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const ProfilePage = () => {
    //   const { data: profile, isLoading } = useGetUserProfileQuery();
    //   const [updateProfile] = useUpdateUserProfileMutation();

    const handleUpdateProfile = (values: UpdateProfilePayload) => {
        // updateProfile(values);
    };

    const profile: UserProfile = {
        name: "Phan Thị Tường Vi",
        email: "pttvi@gmail.com",
        phoneNumber: "0987654321",
        gender: "female",
        dateOfBirth: "2004-07-20",
        address: "Hà Nội",
    };

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="mx-auto max-w-4xl p-4">
            <div className="flex space-x-8">
                {/* Left Section */}
                <div className="w-1/3">
                    <div className="rounded-lg bg-gray-100 p-4 text-center">
                        <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-red-500"></div>
                        <h2 className="text-xl font-semibold">
                            Phan Thị Tường Vi
                        </h2>
                        <p className="text-gray-600">phanvi2004@gmail.com</p>
                        <Button className="mt-4">Change Information</Button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-2/3 space-y-8">
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                        <h3 className="text-lg font-semibold">
                            Edit User Information
                        </h3>
                        <Form
                            initialValues={{
                                name: profile?.name,
                                email: profile?.email,
                                phoneNumber: profile?.phoneNumber,
                                gender: profile?.gender,
                                dateOfBirth: profile?.dateOfBirth,
                                address: profile?.address,
                            }}
                            onFinish={handleUpdateProfile}
                        >
                            <Form.Item
                                label="Full Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: "email",
                                        required: true,
                                        message: "Please input a valid email!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your phone number!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Gender" name="gender">
                                <Select>
                                    <Select.Option value="male">
                                        Male
                                    </Select.Option>
                                    <Select.Option value="female">
                                        Female
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            {/* <Form.Item label="Date of Birth" name="dateOfBirth">
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item> */}
                            <Form.Item label="Address" name="address">
                                <Input.TextArea />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Information
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
