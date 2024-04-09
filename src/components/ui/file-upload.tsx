'use client'
import Uploader from "@/components/ui/uploader";
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

export default function FileUpload() {

    const supabase = createClient();
    const [userSamples, setUserSamples] = useState([]);
    const [engineFile, setEngineFile] = useState();
    const [selectVal, setSelectVal]: any = useState('1');

    async function grabUserData() {

        const {data: {user}} = await supabase.auth.getUser();

        const {data, err} = await supabase
            .from('samples')
            .select()
            .eq('created_by', user.id);

        setUserSamples(data);
    }


    function runEngine(file) {
        console.log(selectVal);
        console.log(engineFile);
    }

    useEffect(() => {
        grabUserData();
    });

    return (
        <>
            <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5 p-5">
                <Uploader/>
                <select
                    value={selectVal}
                    onChange={(e) => {
                        setSelectVal(e.target.value)
                    }}
                    className="bg-accent p-4 font-[arial] text-white rounded-md drop-shadow-xl"
                >
                    <option value='1' disabled>Select file...</option>
                    {userSamples.map(sample => (
                        <option key={sample.id} value={sample.file_name}>{sample.file_name}</option>
                    ))}
                    <option value="bob">Bob</option>
                    <option value="charles">Charles</option>
                </select>
                <button onClick={runEngine}>RUN ANALYSIS</button>
            </div>
        </>
    )
}