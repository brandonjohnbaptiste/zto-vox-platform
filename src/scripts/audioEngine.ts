'use server'
import * as es from 'essentia.js';
import * as tf from '@tensorflow/tfjs';



export async function RunAnalysis() {
    const essentia = await new es.Essentia(es.EssentiaWASM);
    console.log(essentia.version)


    const inputFeatureExtractor = new es.EssentiaModel.EssentiaTFInputExtractor(es.EssentiaWASM, "musicnn");
    // Compute feature for a given audio signal
    let inputMusiCNN = inputFeatureExtractor.computeFrameWise(audioSignal);
    // INFERENCE
    const modelURL = "./autotagging/msd/msd-musicnn-1/model.json"
    // Where `tf` is the global import object from the `@tensorflow/tfjs*` package.
    const musicnn = new es.TensorflowMusiCNN(tf, modelURL);
    // Promise for loading the model
    await musicnn.initialize();
    // Compute predictions for a given input feature.
    let predictions = await musicnn.predict(inputMusiCNN);

    console.log('running test func')

}
