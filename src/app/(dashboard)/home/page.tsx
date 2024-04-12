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
            .eq('public_sample', true);

        setSamples(data);
    }

    useEffect(() => {
        getSamples();
    }, []);

    return (
        <>
            <h1>DASHBOARD</h1>
            {samples.map(sample => (
                <MusicDisplay key={sample.id} sample={sample}/>
            ))}
        </>
    )
}
