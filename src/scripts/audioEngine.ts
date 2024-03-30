'use server'
import * as es from 'essentia.js';
import * as tf from '@tensorflow/tfjs';
import * as wav from  'node-wav';
import {promises as fs} from 'fs';




export async function RunAnalysis() {
    const essentia = await new es.Essentia(es.EssentiaWASM);
    //console.log(essentia.version)

    let buffer = await fs.readFile(process.cwd() + '/src/audioStore/replay-95bpm.wav');
    let audio = wav.decode(buffer);
    //console.log(buffer);
    //console.log(audio);

    const audioVector = essentia.arrayToVector(audio.channelData[0]);
    //console.log(audioVector);


    let bpm = await essentia.RhythmExtractor(audioVector);
    console.log(bpm.bpm);

    return bpm.bpm;
}
