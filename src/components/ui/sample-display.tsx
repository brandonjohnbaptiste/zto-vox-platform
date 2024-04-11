import {createClient} from "@/utils/supabase/client";
import {useState} from "react";

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
                <div key={rand.generate(5)}>
                    <button>PLAY</button>
                    <p className="font-bold text-white">{sample.file_name}</p>
                    <p>Bpm: {sample.bpm}</p>
                    <p>Key: {sample.key}</p>
                    <p>Genre: {sample.genre}</p>
                    <button onClick={() => removeSample(sample)}>Remove</button>
                </div>
            ))}
        </>
    )
}