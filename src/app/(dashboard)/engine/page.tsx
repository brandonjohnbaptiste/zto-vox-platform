'use client'
import EngineOutput from "@/components/ui/engine-output";
import {useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {useEffect} from "react";
import Uploader from "@/components/ui/uploader";
import {ExtractBpm, ExtractKey} from "@/scripts/audioEngine";

export default function Page() {
    const [loading, setLoading]: boolean = useState(false);

    const supabase = createClient();
    const [userSamples, setUserSamples] = useState([]);
    const [sampleUrl, setSampleUrl] = useState('');
    const [selectVal, setSelectVal]: any = useState('1');
    const [genre, setGenre] = useState('1');
    const [bpm, setBpm] = useState();
    const [key, setKey] = useState('');

    async function grabUserData() {

        const {data: {user}} = await supabase.auth.getUser();

        const {data} = await supabase
            .from('samples')
            .select()
            .eq('created_by', user.id);

        setUserSamples(data);
    }



    async function RunAnalysis() {
        setLoading(false);
         let {data} =  supabase.storage
            .from('sample')
            .getPublicUrl(selectVal + '.wav');


        const modelBpm = await ExtractBpm(data.publicUrl);



        const modelKey = await ExtractKey(data.publicUrl);
        setKey(modelKey);
        setSampleUrl(data.publicUrl);
        setBpm(modelBpm.toFixed(0));


    }


    useEffect(() => {
        grabUserData();
    }, [loading]);



    return (
        <>
            <div className="m-10">
                <h1 className="font-[arial] text-[1.75rem] text-white font-bold">ENGINE ANALYSIS</h1>
                <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5 p-5 flex flex-row content-center justify-between">
                    <div>
                        <h2 className="font-[arial] text-[1.2rem] text-white font-bold m-2">Upload File:</h2>
                        <Uploader/>
                    </div>

                    <div className="">
                        <h2 className="font-[arial] text-[1.2rem] m-2 text-white font-bold">Test stored file:</h2>
                        <select
                            value={selectVal}
                            onChange={(e) => {
                                setLoading(false);
                                setSelectVal(e.target.value)

                            }}
                            className="bg-accent p-4 font-[arial] h-[20%] mx-5 text-white rounded-md drop-shadow-xl"
                        >
                            <option value='1' disabled>Select a sample...</option>
                            {userSamples.map(sample => (
                                <option key={sample.id} value={sample.file_name}>{sample.file_name}</option>
                            ))}
                        </select>
                        <button
                            className="bg-background-light p-4 rounded-md font-[arial] text-white uppercase h-[20%]"
                            onClick={async () => {
                                setLoading(false);
                                await RunAnalysis();
                                setLoading(true);
                            }}
                        >RUN ANALYSIS
                        </button>
                    </div>

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