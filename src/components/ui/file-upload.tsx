import Uploader from "@/components/ui/uploader";

export default function FileUpload() {
    return (
        <>
            <div className="w-[100%] bg-grey rounded-xl drop-shadow-xl mt-5">
                <Uploader className="w-[50%] h-[50%]"/>
            </div>
        </>
    )
}