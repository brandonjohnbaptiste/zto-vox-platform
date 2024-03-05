import type { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";
import {Bebas_Neue} from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"]});

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
                        width={100}
                        height={100}
                        alt='company logo'
                        className="self-center mx-auto w-[50%]"
                    />
                    <h2 className={`${bebasNeue.className} text-[8rem] mx-auto self-end w-[50%] text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-600 to-indigo-600`} >VM</h2>

                </div>
                <div className="w-[400px] h-[750px] bg-background-light m-5 rounded-md"></div>
            </div>
            {children}
            </body>
        </html>
    );
}
