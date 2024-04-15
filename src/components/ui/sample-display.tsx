import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

export default function SampleDisplay({playlist}) {
    const supabase = createClient();
    const [samples, setSamples] = useState(playlist.samples);
    const rand = require('random-key');


    async function removeSample(targetSample) {
        const sampleJson = playlist.samples.filter(sample => sample.id !== targetSample.id);

        const {error} = await supabase
            .from('playlists')
            .update({samples: sampleJson})
            .eq('id', playlist.id);

        setSamples(sampleJson);
    }


    return (
        <>
            {samples.map(sample => (

                <div
                    className="bg-background-light/40 m-2 flex p-5 justify-between"
                    key={rand.generate(5)}
                >
                    <div className="flex flex-row space-x-5">
                        <p className="font-bold text-white p-5">{sample.file_name}</p>
                        <p className="font-bold text-white p-5">BPM:<span className="font-normal font-[arial] mx-2">{sample.bpm}</span></p>
                        <p className="font-bold text-white p-5">Key: <span className="font-normal font-[arial] mx-2 capitalize">{sample.key}</span></p>
                        <p className="font-bold text-white p-5">Genre: <span className="font-normal font-[arial] mx-2 capitalize">{sample.genre}</span></p>
                    </div>

                    <div className="">
                        <button
                            className="bg-red-700/70 p-2 m-3 text-white font-[arial] rounded-md"
                            onClick={() => removeSample(sample)}>Remove</button>
                    </div>
                </div>
            ))}
        </>
    )
}