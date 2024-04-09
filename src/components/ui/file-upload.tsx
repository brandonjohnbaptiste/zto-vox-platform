'use client'
import Uploader from "@/components/ui/uploader";
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

export default function FileUpload() {

    return (
        <>
            <Uploader/>
        </>
    )
}