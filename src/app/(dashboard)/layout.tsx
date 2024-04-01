import type { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";
import {Bebas_Neue} from "next/font/google";
import {ArrowLeftIcon, BeakerIcon, HomeIcon, RectangleStackIcon} from "@heroicons/react/24/solid";


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
            <div className="font-[arial] w-full h-screen flex items-stretch">
                <div className="float-left">
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
                    <div className="w-[400px] h-[750px] bg-background-light m-5 rounded-md flex flex-col content-center justify-between">
                        <div className="flex flex-col">
                            <button className="link-card">
                                <HomeIcon className="link-icon" />
                                <h2 className="link-text">Home</h2>
                            </button>
                            <button className="link-card">
                                <RectangleStackIcon className="link-icon" />
                                <h2 className="link-text">Playlists</h2>
                            </button>
                            <button className="link-card">
                                <BeakerIcon className="h-8 w-8 basis-4/12 text-white"/>
                                <h2 className="font-[arial] text-[1.25rem] font-bold text-white uppercase text-left basis-8/12">Sample Analysis</h2>
                            </button>
                        </div>
                        <button className="bg-accent w-[90%] h-[100px] rounded-xl my-4 mx-auto justify-self-end hover:scale-105 flex justify-center items-center">
                            <ArrowLeftIcon className="link-icon" />
                            <h1 className="text-white font-[arial] text-[1.5rem] font-bold uppercase text-center basis-8/12">Sign Out</h1>
                        </button>
                    </div>
                </div>
                <div className="w-full h-[970px] bg-background-light m-5 inline-block rounded-md">
                    {children}
                </div>
            </div>
    );
}
