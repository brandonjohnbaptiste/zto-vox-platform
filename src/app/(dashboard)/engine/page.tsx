import FileUpload from "@/components/ui/file-upload";
import EngineOutput from "@/components/ui/engine-output";

export default function Page() {
    return (
        <>
            <div className="m-10">
                <h1 className="font-[arial] text-[1.75rem] text-white font-bold">ENGINE ANALYSIS</h1>
                <FileUpload/>
                <div className="mt-5 flex justify-between">
                </div>
            </div>

        </>
    )
}