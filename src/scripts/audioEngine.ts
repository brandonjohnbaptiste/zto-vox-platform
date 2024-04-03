'use server'
import * as es from 'essentia.js';
import * as wav from  'node-wav';
import {promises as fs} from 'fs';




export async function CalcBpm() {
    const essentia = await new es.Essentia(es.EssentiaWASM);
    let buffer = await fs.readFile(process.cwd() + '/src/audioStore/replay-95bpm.wav');
    let audio = wav.decode(buffer);

    const audioVector = essentia.arrayToVector(audio.channelData[0]);
    let calculatedBpm = await essentia.RhythmExtractor(audioVector);

    return calculatedBpm.bpm;
}
