'use client';
import {useEffect, useState} from "react";
import Uppy, {UppyOptions} from "@uppy/core";
import Tus from "@uppy/tus";
import {Dashboard} from "@uppy/react";

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import {createClient} from "@/utils/supabase/client";

export default function Uploader() {
    const supabase = createClient();

    const [fileUploaded, setFileUploaded] = useState(false);
    const [sample, setSample]: any = useState();
    const [genre, setGenre] = useState('');

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

        setSample(file);
    });

    uppy.on('complete', (result) => {
        setFileUploaded(true);
    });


    async function uploadSample() {
        console.log(sample);

        const {data: {user}} = await supabase.auth.getUser();
        const {data} = supabase.storage
            .from('sample')
            .getPublicUrl(sample.name);

        const file_name = sample.name.slice(0,-4);

        const {err} = await supabase
            .from('samples')
            .insert({genre: genre, pathname: data.publicUrl, file_name: file_name, public_sample: false, created_by: user.id});

        console.log(err);

    }

    return (
        <>
            <Dashboard uppy={uppy} theme="dark" height={300} width={300}/>
            {fileUploaded &&
                <>
                    <select
                        className="bg-accent p-4 font-[arial] text-white rounded-md drop-shadow-xl"
                        value={genre}
                        onChange={(e) => {
                            setGenre(e.target.value);
                        }
                        }
                    >
                        <option value="1" disabled="">Select a genre</option>
                        <option value="rnb">Rnb</option>
                        <option value="hiphop">Hip hop</option>
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                    </select>
                    <button
                        onClick={() => {
                            uploadSample();
                            setFileUploaded(false);
                        }
                        }
                    >Save file</button>

                </>



            }

        </>

    )
}