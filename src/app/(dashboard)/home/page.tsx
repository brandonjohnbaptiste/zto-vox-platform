'use client'
import {Button} from "@/components/ui/moving-border";
import {runAnalysis} from "@/scripts/audioEngine";


export default function Page() {
    return (
        <>
            <h1>DASHBOARD</h1>
            <Button onClick={runTest}>RUN</Button>
        </>

    )
}


export function runTest() {
    runAnalysis();
}