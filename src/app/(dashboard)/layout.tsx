import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Image from "next/image";


export const metadata: Metadata = {
    title: "Vox Match",
    description: "An online platform for matching vocals to samples",
};

export default function HomeLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-[arial] w-full h-screen flex items-stretch">
            <div>
                <div className="w-[400px] h-[200px] bg-background-light m-5 rounded-md flex flex-row">
                    <Image
                        src='/zto-logo.png'
                        width={200}
                        height={200}
                        alt='company logo'
                    />
                    <Image
                        src='/zto-logo.png'
                        width={200}
                        height={200}
                        alt='company logo'
                    />

                </div>
                <div className="w-[400px] h-[750px] bg-background-light m-5 rounded-md"></div>
            </div>
            {children}
            </body>
        </html>
    );
}
