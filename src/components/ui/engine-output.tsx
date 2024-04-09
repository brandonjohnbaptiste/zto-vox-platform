'use client'
import {MusicalNoteIcon} from "@heroicons/react/24/solid";
import {useEffect, useRef, useState} from "react";
import useSound from "use-sound";

export default function EngineOutput({file}) {


    const [play, {stop}] = useSound(file.url);
    const [playing, setPlaying] = useState(false);

    function playSong() {
        setPlaying(true);
        play();
    }

    function stopSong() {
        setPlaying(false);
        stop();
    }

    return (
        <>
            <div className="bg-gradient-to-b from-accent via-pink-accent/80 to-accent/30 w-[20%] h-[40vh] p-1 rounded-md drop-shadow-xl">
                <div className="bg-grey w-[100%] h-[100%] rounded-md flex flex-col">
                    <div className="my-5 basis-8/12 w-full h-full flex flex-col">
                        <MusicalNoteIcon className="text-white w-20 h-20 mx-auto" />
                        <h2 className="text-center font-[arial] font-bold text-white text-[1.2rem] mt-10">{file.title}</h2>
                    </div>
                    <div className="basis-2/12 w-full h-full flex">
                        <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">BPM:</h3>
                            <p className="my-3 ml-2 text-white font-[arial] text-[1rem]">{file.bpm}</p>
                    </div>
                    <div className="basis-2/12 w-full h-full flex">
                        <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">KEY: </h3>
                        <p className="my-3 ml-2 text-white font-[arial] text-[1rem]">{file.key}</p>
                    </div>
                    <button
                        className="bg-accent w-[60%] mx-auto my-3 p-3 rounded-md text-white font-[arial] font-bold uppercase text-[.75rem] hover:scale-105"
                        onClick={playing ? stopSong : playSong}
                    >Play
                    </button>
               </div>
            </div>




        </>
    )
}