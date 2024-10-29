import Image from "next/image";
import { twMerge } from "tailwind-merge";

const IconFrame = ({
    src,
    alt,
    bgColor = "#4D2C5E",
    width = 54,
    height = 54,
    frameSize = "6.25rem",
    className = "",
}: Readonly<{
    src: string;
    alt: string;
    bgColor?: string;
    width?: number;
    height?: number;
    frameSize?: string;
    className?: string;
}>) => {
    return (
        <div
            className={twMerge(
                "flex place-content-center rounded-3xl",
                className,
            )}
            style={{
                backgroundColor: bgColor,
                width: frameSize,
                height: frameSize,
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="self-center"
            />
        </div>
    );
};

export default IconFrame;
