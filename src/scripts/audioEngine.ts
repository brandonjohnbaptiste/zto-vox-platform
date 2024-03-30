'use server'
import * as es from 'essentia.js';
import * as tf from '@tensorflow/tfjs';
import * as wav from  'node-wav';
import {promises as fs} from 'fs';




export async function RunAnalysis() {
    const essentia = await new es.Essentia(es.EssentiaWASM);
    console.log(essentia.version)

    const buffer = await fs.readFile(process.cwd() + '/src/audioStore/replay-95bpm.wav');
    const audio = wav.decode(buffer);
    console.log(buffer);
    console.log(audio);




}
