import Image from "next/image";
import backpack from "@public/auth-bg/backpack.png";
import globe from "@public/auth-bg/globe.png";
import calculator from "@public/auth-bg/calculator.png";
import scissors from "@public/auth-bg/scissors.png";
import pencil from "@public/auth-bg/pencil.png";
import crayons from "@public/auth-bg/crayons.png";
import "./auth-background.css";

export default function AuthBackground() {
    return (
        <>
            <Image
                className="absolute left-[-7%] top-[15%] animate-[backpack_20s_ease-in-out_infinite]"
                src={backpack}
                alt="backpack"
                width={400}
                height={400}
            />
            <Image
                className="absolute bottom-[-15%] left-0 animate-[globe_100s_linear_infinite]"
                src={globe}
                alt="globe"
                width={500}
                height={500}
            />
            <Image
                className="absolute bottom-[-15%] right-1/4 animate-[calculator_15s_ease-in-out_infinite]"
                src={calculator}
                alt="calculator"
                width={400}
                height={400}
            />
            <Image
                className="absolute right-[-10%] top-[25%] animate-[scissors_20s_ease-in-out_infinite]"
                src={scissors}
                alt="scissors"
                width={400}
                height={400}
            />
            <Image
                className="absolute right-[15%] top-[-10%] animate-[pencil_25s_ease-in-out_infinite]"
                src={pencil}
                alt="pencil"
                width={400}
                height={400}
            />
            <Image
                className="absolute left-[15%] top-[-10%] animate-[crayons_30s_ease-in-out_infinite]"
                src={crayons}
                alt="crayons"
                width={400}
                height={400}
            />
        </>
    );
}
