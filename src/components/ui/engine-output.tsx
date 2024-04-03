import {MusicalNoteIcon} from "@heroicons/react/24/solid";

export default function EngineOutput() {
    return (
        <>
            <div className="bg-gradient-to-b from-accent via-pink-accent/80 to-accent/30 w-[20%] h-[40vh] p-1 rounded-md drop-shadow-xl">
                <div className="bg-grey w-[100%] h-[100%] rounded-md flex flex-col">
                    <div className="my-5 basis-8/12 w-full h-full flex flex-col">
                        <MusicalNoteIcon className="text-white w-20 h-20 mx-auto" />
                        <h2 className="text-center font-[arial] font-bold text-white text-[1.2rem] mt-10">replay-95bpm.wav</h2>
                    </div>
                    <div className="basis-2/12 w-full h-full flex">
                        <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">BPM:</h3>
                        <p className="my-3 ml-2 text-white font-[arial] text-[1rem]">123</p>
                    </div>
                    <div className="basis-2/12 w-full h-full flex">
                        <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">KEY: </h3>
                        <p className="my-3 ml-2 text-white font-[arial] text-[1rem]">C#m</p>
                    </div>
                    <button className="bg-accent w-[60%] mx-auto my-3 p-3 rounded-md text-white font-[arial] font-bold uppercase text-[.75rem]">Run Analysis</button>
               </div>
            </div>




        </>
    )
}