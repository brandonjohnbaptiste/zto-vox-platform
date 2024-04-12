'use client'
import {MusicalNoteIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";




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
                        onClick={toggle}
                    >{playing ? 'Pause' : 'Play'}
                    </button>
               </div>
            </div>
            { foundMatch &&
                <div>
                    <div>
                        {bestMatch.length >= 1 ?  'found best match' : 'no best match'}
                    </div>
                    <div>
                        {bpmMatch.length >= 1 ? 'found bpm match' : 'no bpm match'}
                    </div>
                    <div>
                        {keyMatch.length >= 1 ? 'found key match' : 'no key match' }
                    </div>
                </div>
            }



        </>
    )
}