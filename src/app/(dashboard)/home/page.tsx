'use client'
import {Button} from "@/components/ui/moving-border";
import {RunAnalysis} from "@/scripts/audioEngine";
import loadModel from "@/scripts/audioUtils";


export default function Page() {
    return (
        <>
            <h1>DASHBOARD</h1>
            <Button onClick={RunTest}>RUN</Button>
        </>

    )
}


function RunTest() {
    const audioCtx = new AudioContext();
    console.log(audioCtx)


    loadModel();
}