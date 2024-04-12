import {MusicalNoteIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";

export default function MusicDisplay({sample}) {
    const useAudio = (url) => {
        const [audio] = useState(new Audio(url));
        const [playing, setPlaying] = useState(false);
        const toggle = () => setPlaying(!playing);

        useEffect(() => {
            playing ? audio.play() : audio.pause();
        }, [playing, audio]);

        useEffect(() => {
            audio.addEventListener("ended", () => setPlaying(false));
            return () => {
                audio.removeEventListener("ended", () => setPlaying(false));
            };
        }, [audio]);

        return [playing, toggle];
    };

    const [playing, toggle] = useAudio(sample.pathname);
    return (
        <>
            <div className="bg-gradient-to-b from-accent via-pink-accent/80 to-accent/30 w-[30%] h-[50vh] p-1 rounded-md drop-shadow-xl">
                <div className="bg-grey w-[100%] h-[100%] rounded-md flex flex-col">
                    <div className="my-5 basis-8/12 w-full h-full flex flex-col">
                        <MusicalNoteIcon className="text-white w-20 h-20 mx-auto" />
                        <h2 className="text-center font-[arial] font-bold text-white text-[1.2rem] mt-10">{sample.file_name}</h2>
                    </div>
                    <div className="basis-2/12 w-full h-full flex">
                        <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">BPM:</h3>
                        <p className="my-3 ml-2 text-white font-[arial] text-[1rem]">{sample.bpm}</p>
                    </div>
                    <div className="basis-2/12 w-full h-full flex">
                        <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">KEY: </h3>
                        <p className="my-3 ml-2 text-white font-[arial] text-[1rem] capitalize">{sample.key}</p>
                    </div>
                    <button
                        className="bg-accent w-[60%] mx-auto my-3 p-3 rounded-md text-white font-[arial] font-bold uppercase text-[.75rem] hover:scale-105"
                        onClick={toggle}
                    >{playing ? 'Pause' : 'Play'}
                    </button>
                </div>
            </div>
        </>
    )
}