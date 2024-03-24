'use server'
import  {EssentiaModel, EssentiaWASM } from "essentia.js";





export async function essTest() {
    console.log('running test func')
     const essentia = new EssentiaModel(EssentiaWASM);
     console.log(essentia);

}
