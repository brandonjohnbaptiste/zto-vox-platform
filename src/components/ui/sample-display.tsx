export default function SampleDisplay({playlist}) {
    return (
        <>
            {playlist.samples.map(sample => (
                <div>
                    <button>PLAY</button>
                    <p className="font-bold text-white">{sample.file_name}</p>
                    <p>Bpm: {sample.bpm}</p>
                    <p>Key: {sample.key}</p>
                    <p>Genre: {sample.genre}</p>
                </div>
            ))}
        </>
    )
}