'use server'
import * as es from 'essentia.js';
import * as wav from  'node-wav';
import {promises as fs} from 'fs';
import fetch from "node-fetch";




export async function ExtractBpm(url) {
    const essentia = await new es.Essentia(es.EssentiaWASM);


    let requstedFile = await fetch(url);
    let buffer = await requstedFile.buffer();
    let audio = wav.decode(buffer);

    const audioVector = essentia.arrayToVector(audio.channelData[0]);
    let calculatedBpm = await essentia.RhythmExtractor(audioVector);

    essentia.shutdown();
    return calculatedBpm.bpm;
}


export async function ExtractKey() {
    const essentia = await new es.Essentia(es.EssentiaWASM);
    let buffer = await fs.readFile(process.cwd() + '/src/audioStore/replay-95bpm.wav');
    let audio = wav.decode(buffer);



    const audioVector = essentia.arrayToVector(audio.channelData[0]);
    let extractedKey = await  essentia.KeyExtractor(audioVector);
    let scale;

    if (extractedKey.scale == 'minor') {
        scale = 'm';
    } else {
        scale = '';
    }

    essentia.shutdown();
    return extractedKey.key + scale;

}