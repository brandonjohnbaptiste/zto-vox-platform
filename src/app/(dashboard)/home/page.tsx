'use client'
import {Button} from "@/components/ui/moving-border";
import loadModel from "@/scripts/audioUtils";
import {useState} from "react";
import {RunAnalysis} from "@/scripts/audioEngine";


export default function Page() {
    const [bpm, setBpm] = useState('0');

    const calcBpm = async () => {
        let modelBpm = await RunAnalysis();
        console.log(modelBpm);
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
