'use client'
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import SampleDisplay from "@/components/ui/sample-display";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const supabase = createClient();
    const [playlists, setPlaylists] = useState([]);
    const [showingData, setShowingData] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState();

     async function getUserPlaylists() {
        const  {data: {user: currentUser}} = await supabase.auth.getUser();

        const {data, err} = await supabase
            .from('playlists')
            .select()
            .eq('created_by', currentUser.id);

        setPlaylists(data);
    }

    function displayPlaylist(playlist) {
         console.log(playlist);
        setCurrentPlaylist(playlist);
        setShowingData(true);
    }

    useEffect(() => {
        getUserPlaylists();
    }, []);

    return (
        <>
            <h1 className="text-white uppercase font-[arial] font-bold text-[2rem] m-5">Playlists</h1>
            <div className="flex flex-row">
                <div className="bg-grey m-5 p-5 w-[30vh] h-[40vh] rounded-md drop-shadow-xl">
                    {playlists.map(playlist => (
                        <button
                            key={playlist.id}
                            onClick={() => {
                                setShowingData(false);
                                getUserPlaylists().then(() => displayPlaylist(playlist))
                            }}
                        >{playlist.playlist_name}
                        </button>
                    ))}
                </div>
                <div className="bg-grey m-5 p-5 w-full h-[80vh] rounded-md drop-shadow-xl">
                    {showingData &&
                        <div>
                            <SampleDisplay playlist={currentPlaylist}/>
                        </div>

                    }
                </div>
            </div>

        </>
    )
}