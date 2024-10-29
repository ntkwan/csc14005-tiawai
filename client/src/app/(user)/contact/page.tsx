"use client";

import { Col, Row } from "antd";
import {
    TiawaiIntroductionHeader,
    TiawaiIntroduction,
    TiawaiDescription,
} from "@/app/(user)/contact/_ui/tiawai-introduction";
import FormLayout from "@/ui/form/form-layout";
import ContactForm from "@/ui/form/contact-form";
import Image from "next/image";
import FeaturesBox from "@/ui/features-box";
import SectionBgGradient from "@public/section-bg-gradient.png";
import HomeIconBg from "@public/home-icon-bg.svg";

export default function ContactPage() {
    return (
        <div className="contact__page mb-40 min-h-screen">
            <Image
                className="absolute bottom-0 left-0 right-0 top-0 -z-50"
                src={SectionBgGradient}
                alt="home-gradient-bg"
            />

            <Row justify="center">
                <Col span={24}>
                    <Image
                        className="absolute bottom-0 left-0 right-0 top-0 -z-50"
                        src={HomeIconBg}
                        alt="home-bg-icon"
                    />
                    <TiawaiIntroductionHeader />
                </Col>

                <Col span={20} className="-translate-y-[15%]">
                    <FeaturesBox />
                </Col>

                <Col span={20}>
                    <Row justify="space-between" gutter={[0, 40]}>
                        <TiawaiIntroduction />
                        <TiawaiDescription />
                    </Row>
                </Col>

                <Col span={16} className="mt-20">
                    <FormLayout
                        className="form__about-tiawai bg-[#E9DAE94D]"
                        title="Liên hệ với chúng tôi"
                    >
                        <ContactForm />
                    </FormLayout>
                </Col>
            </Row>
        </div>
    );
}
