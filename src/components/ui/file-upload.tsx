'use client'
import Uploader from "@/components/ui/uploader";
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

export default function FileUpload() {

    const supabase = createClient();
    const [userSamples, setUserSamples] = useState([]);

    async function grabUserData() {

        const {data: {user}} = await supabase.auth.getUser();

        const {data, err} = await supabase
            .from('samples')
            .select()
            .eq('created_by', user.id);

        setUserSamples(data);
    }


    useEffect(() => {
        grabUserData();
    });

    return (
        <>
            <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5 p-5">
                <Uploader/>
                {userSamples.map(sample => (
                    <p key={sample.id}>{sample.file_name}</p>
                ))}
            </div>
        </>
    )
}