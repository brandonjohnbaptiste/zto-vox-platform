'use server'
import * as es from 'essentia.js';
import * as tf from '@tensorflow/tfjs';


export async function runAnalysis() {
    const essentia = await new es.Essentia(es.EssentiaWASM);
    console.log(essentia.version)

    console.log(essentia.algorithmNames)
    console.log('running test func')

}
