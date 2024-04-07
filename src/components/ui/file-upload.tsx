'use client'
import Uploader from "@/components/ui/uploader";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useEffect} from "react";

export default function FileUpload() {
    const supabase = createClientComponentClient();
    const user_samples = '';



    //const { data: {user} } = supabase.auth.getUser();
    //console.log(user);



    return (
        <>
            <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5 p-5">
                <Uploader/>
            </div>
        </>
    )
}