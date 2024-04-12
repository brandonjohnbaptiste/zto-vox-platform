'use client'
import React, {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import MusicDisplay from "@/components/ui/music-display";


export default function Page() {
    const supabase = createClient();
    const [samples, setSamples] = useState([]);

    async function getSamples() {
        const {data} = await supabase
            .from('samples')
            .select()
            .eq('public_sample', true)
            .limit(3);

        setSamples(data);
    }

    useEffect(() => {
        getSamples();
    }, []);

    return (
        <>
            <h1 className="text-white uppercase font-[arial] font-bold text-[2rem] m-5">Dashboard</h1>
            <div className="flex flex-row w-[80%] justify-around m-5 mx-auto">
                {samples.map(sample => (
                    <MusicDisplay key={sample.id} sample={sample}/>
                ))}
            </div>

        </>
    )
}
