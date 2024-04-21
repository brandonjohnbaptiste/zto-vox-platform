'use client'
import {MusicalNoteIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import MusicDisplay from "@/components/ui/music-display";




export default function EngineOutput({file}) {
    const supabase = createClient();
    const [keyMatch, setKeyMatch] = useState([]);
    const [bpmMatch, setBpmMatch] = useState([]);
    const [bestMatch, setBestMatch] = useState([]);

    const [foundMatch, setFoundMatch] = useState(false);
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


    async function updateSampleInfo() {
        const {data, err} = await supabase
            .from('samples')
            .update({key: file.key.toLowerCase(), bpm: file.bpm})
            .eq('file_name', file.title)
            .select();

    }

    async function getSimilarSamples() {
        // matching by key
        const {data: keyMatch, err} = await supabase
            .from('samples')
            .select()
            .eq('key', file.key.toLowerCase());

        let keyMatchArr = Object.assign([], keyMatch);
        let keyOutputArr = [];
        keyMatchArr.map(data => {
            if (data.file_name != file.title) {
                keyOutputArr.push(data);
            }
                });

        //matching by bpm
        const upperLimit = parseInt(file.bpm) + 5;
        const lowerLimit = parseInt(file.bpm) - 5;



        const {data: bpmMatch} = await supabase
            .from('samples')
            .select()
            .lte('bpm', upperLimit)
            .gte('bpm', lowerLimit);

        let bpmMatchArr = Object.assign([], bpmMatch);
        let bpmOutputArr = [];
        bpmMatchArr.map(data => {
            if (data.file_name != file.title) {
                bpmOutputArr.push(data);
            }
        });



        //best match
        const extactUpperLimit = parseInt(file.bpm) + 2;
        const extractLowerLimit = parseInt(file.bpm) + 2;

        const {data: bestMatch} = await supabase
            .from('samples')
            .select()
            .eq('key', file.key.toLowerCase())
            .lte('bpm', extactUpperLimit)
            .gte('bpm', extractLowerLimit);

        let bestMatchArr = Object.assign([], bestMatch);
        let bestMatchOutputArr = [];
        bestMatchArr.map(data => {
            if (data.file_name != file.title) {
                bestMatchOutputArr.push(data);
            }
        });


        setBestMatch(bestMatchOutputArr);
        setKeyMatch(keyOutputArr);
        setBpmMatch(bpmOutputArr);
        setFoundMatch(true);
    }

    useEffect( () => {
        getSimilarSamples();
        updateSampleInfo();

    }, [])


    const [playing, toggle] = useAudio(file.url);

    return (
        <>
            <div className="flex flex-row justify-between w-full">
                    <div className="bg-background rounded-md grid grid-cols-3 grid-rows-4 w-[60%] h-[40vh] border-5 border-white gap-2 drop-shadow-xl">
                        <div className="flex flex-col col-span-2  row-span-3 place-self-center ">
                            <MusicalNoteIcon className="text-white w-20 h-20 mx-auto" />
                            <h2 className="text-center font-[arial] font-bold text-white text-[1.2rem] mt-10">{file.title}</h2>
                        </div>
                        <button
                            className="col-start-1 col-span-2  bg-accent w-[30%] mx-auto my-3 p-3 rounded-md text-white font-[arial] font-bold uppercase text-[.75rem] hover:scale-105 row-span-1"
                            onClick={toggle}
                        >{playing ? 'Pause' : 'Play'}
                        </button>
                        <div className="col-start-3 row-span-2 row-start-2">
                            <div className="w-full h-full flex">
                                <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">BPM:</h3>
                                <p className="my-3 ml-2 text-white font-[arial] text-[1rem]">{file.bpm}</p>
                            </div>
                            <div className="w-full h-full flex">
                                <h3 className="ml-5 my-3 text-white font-[arial] font-bold uppercase text-[1rem]">KEY: </h3>
                                <p className="my-3 ml-2 text-white font-[arial] text-[1rem]">{file.key}</p>
                            </div>
                        </div>


                    </div>
                { foundMatch &&
                    <div className="">
                        {bestMatch.length >= 1 ?  <MusicDisplay sample={bestMatch[0]} /> : ''}

                        {bpmMatch.length >= 1 ? <MusicDisplay sample={bpmMatch[0]} />: ''}

                        {keyMatch.length >= 1 ? <MusicDisplay sample={keyMatch[0]}/> : '' }

                    </div>
                }
            </div>







        </>
    )
}