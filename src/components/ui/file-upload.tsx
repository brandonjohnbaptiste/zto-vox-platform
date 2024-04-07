'use client'
import Uploader from "@/components/ui/uploader";
import {createClient} from "@/utils/supabase/client";
import {useEffect} from "react";

export default function FileUpload() {

    const supabase = createClient();

    async function grabUserData() {

        const {data: {user}} = await supabase.auth.getUser();
        console.log(user.id);

        const {data, err} = await supabase
            .from('samples')
            .select()
            .eq('created_by', user.id);

        console.log(data);
    }


    useEffect(() => {
        grabUserData();
    });

    return (
        <>
            <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5 p-5">
                <Uploader/>
            </div>
        </>
    )
}