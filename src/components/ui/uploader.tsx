'use client';
import {useEffect, useState} from "react";
import Uppy, {UppyOptions} from "@uppy/core";
import Tus from "@uppy/tus";
import {Dashboard} from "@uppy/react";

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

export default function Uploader() {
    let [uppy] = useState(() => new Uppy(
        {restrictions: {maxNumberOfFiles: 1}}
        ).use(Tus, {
            endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
            headers: {
                authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            },
            chunkSize: 6 * 1024 * 1024,
            allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
        })
    );

    uppy.on('file-added', (file) => {
        const supabaseMetadata = {
            bucketName: 'sample',
            objectName: file.name,
            contentType: file.type
        }

        file.meta = {
            ...file.meta,
            ...supabaseMetadata
        }

        console.log('file added', file)
    });

    uppy.on('complete', (result) => {
        console.log('Upload complete, uploaded files:', result.successful);
    });



    return <Dashboard uppy={uppy} theme="dark" height={300} width={300}/>
}