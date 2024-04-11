'use client'
import EngineOutput from "@/components/ui/engine-output";
import {useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {useEffect} from "react";
import Uploader from "@/components/ui/uploader";
import {ExtractBpm, ExtractKey} from "@/scripts/audioEngine";

export default function Page() {
    const [loading, setLoading] = useState(false);

    const supabase = createClient();
    const [userSamples, setUserSamples] = useState([]);
    const [sampleUrl, setSampleUrl] = useState('');
    const [engineFile, setEngineFile] = useState();
    const [selectVal, setSelectVal]: any = useState('1');
    const [bpm, setBpm] = useState();
    const [key, setKey] = useState('');

    async function grabUserData() {

        const {data: {user}} = await supabase.auth.getUser();

        const {data, err} = await supabase
            .from('samples')
            .select()
            .eq('created_by', user.id);

        setUserSamples(data);
    }



    async function RunAnalysis() {
         let {data} =  supabase.storage
            .from('sample')
            .getPublicUrl(selectVal + '.wav');



        const modelBpm = await ExtractBpm(data.publicUrl);
        setBpm(modelBpm.toFixed(0));


        const modelKey = await ExtractKey(data.publicUrl);
        setKey(modelKey);
        setSampleUrl(data.publicUrl);
    }


    useEffect(() => {
        grabUserData();
    });

    return (
        <>
            <div className="m-10">
                <h1 className="font-[arial] text-[1.75rem] text-white font-bold">ENGINE ANALYSIS</h1>
                <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5 p-5">
                    <Uploader/>
                    <select
                        value={selectVal}
                        onChange={(e) => {
                            setSelectVal(e.target.value)
                            setLoading(false);
                        }}
                        className="bg-accent p-4 font-[arial] text-white rounded-md drop-shadow-xl"
                    >
                        <option value='1' disabled>Select a sample...</option>
                        {userSamples.map(sample => (
                            <option key={sample.id} value={sample.file_name}>{sample.file_name}</option>
                        ))}
                    </select>
                    <button
                        className="bg-background-light p-5 rounded-md m-5 font-[arial] text-white uppercase"
                        onClick={() => {
                            setLoading(true)
                            RunAnalysis()

                        }}
                    >RUN ANALYSIS
                    </button>
                </div>
                <div className="mt-5 flex justify-between">
                    {loading &&
                        <EngineOutput
                            file={{title: selectVal, key: key, bpm: bpm, url: sampleUrl}}
                        />
                    }
                </div>
            </div>

        </>
    )
}