import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";

export default function SampleDisplay({playlist}) {
    const supabase = createClient();
    const router = useRouter();



    async function removeSample(targetSample) {
        const sampleJson = playlist.samples.filter(sample => sample.id !== targetSample.id);

        const {error} = await supabase
            .from('playlists')
            .update({samples: sampleJson})
            .eq('id', playlist.id);


    }

    return (
        <>
            {playlist.samples.map(sample => (
                <div key={sample.id}>
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