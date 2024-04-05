import Uploader from "@/components/ui/uploader";

export default function FileUpload() {
    return (
        <>
            <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5 p-5">
                <Uploader/>
            </div>
        </>
    )
}