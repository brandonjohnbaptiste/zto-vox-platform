'use server'
let esPkg = require('essentia.js');






export async function essTest() {
    const essentia = await new esPkg.Essentia(esPkg.EssentiaWASM);
    console.log(essentia.version)

    console.log(essentia.algorithmNames)
    console.log('running test func')

}
