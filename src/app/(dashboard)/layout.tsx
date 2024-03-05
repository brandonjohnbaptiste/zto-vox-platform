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
                        width={200}
                        height={200}
                        alt='company logo'
                    />
                    <h2 className={`${bebasNeue.className} text-white text-[8rem] mx-auto self-center`} >VM</h2>

                </div>
                <div className="w-[400px] h-[750px] bg-background-light m-5 rounded-md"></div>
            </div>
            {children}
            </body>
        </html>
    );
}
