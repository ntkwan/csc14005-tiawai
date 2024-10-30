import Header from "@/ui/header";
import ChatButton from "@/ui/chat-button";

export default function Userlayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-[4.375rem] my-[1.5rem] bg-no-repeat text-black">
            <Header />
            <ChatButton />
            {children}
        </div>
    );
}
