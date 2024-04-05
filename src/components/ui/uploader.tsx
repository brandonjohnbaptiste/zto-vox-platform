'use client';
import {useEffect, useState} from "react";
import Uppy, {UppyOptions} from "@uppy/core";
import {Dashboard} from "@uppy/react";

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

export default function Uploader() {
    const [uppy] = useState(() => new Uppy({restrictions: {maxNumberOfFiles: 1}}));
    return <Dashboard uppy={uppy} theme="dark" height={300} width={300}/>
}