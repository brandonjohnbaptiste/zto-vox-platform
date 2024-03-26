'use client'
import {Button} from "@/components/ui/moving-border";
import {essTest} from "@/scripts/test";


export default function Page() {
    return (
        <>
            <h1>DASHBOARD</h1>
            <Button onClick={runTest}>RUN</Button>
        </>

    )
}


export function runTest() {
    essTest();
}