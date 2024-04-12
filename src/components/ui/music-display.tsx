export default function MusicDisplay({sample}) {
    return (
        <>
            <h1>{sample.file_name}</h1>
            <p>{sample.key}</p>
            <p>{sample.bpm}</p>
        </>
    )
}