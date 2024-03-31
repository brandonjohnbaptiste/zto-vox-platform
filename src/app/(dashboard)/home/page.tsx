'use client'
import React, {useState} from "react";
import {RunAnalysis} from "@/scripts/audioEngine";
import {Button} from "@/components/ui/moving-border";


export default function Page() {
    const [bpm, setBpm] = useState('0');


    const calcBpm = async () => {
        let modelBpm = await RunAnalysis();
        setBpm(`${modelBpm.toFixed(0)}`);
    }


    return (
        <>
            <h1>DASHBOARD</h1>
            <Button onClick={calcBpm}>RUN</Button>
            <h2>{bpm}</h2>
        </>
    )
}
