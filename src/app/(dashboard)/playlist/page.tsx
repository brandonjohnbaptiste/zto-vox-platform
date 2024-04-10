'use client'
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

export default function Page() {
    const supabase = createClient();
    const [playlists, setPlaylists] = useState([]);
    const [showingData, setShowingData] = useState(false);
    const [name, setName] = useState('');

    async function getUserPlaylists() {
        const {data: {user}} = await supabase.auth.getUser();

        const {data, err} = await supabase
            .from('playlists')
            .select()
            .eq('created_by', user.id);

        setPlaylists(data);
    }

    function displayPlaylist(playlist) {
        setName('Name: ' + playlist.playlist_name);
        setShowingData(true);

    }

    useEffect(() => {
        getUserPlaylists();
    })

    return (
        <>
            <h1 className="text-white uppercase font-[arial] font-bold text-[2rem] m-5">Playlist</h1>
            <div className="flex flex-row">
                <div className="bg-grey m-5 p-5 w-[30vh] h-[40vh] rounded-md drop-shadow-xl">
                    {playlists.map(playlist => (
                        <button
                            key={playlist.id}
                            onClick={() => {
                                displayPlaylist(playlist)
                            }}
                        >{playlist.playlist_name}
                        </button>
                    ))}
                </div>
                <div className="bg-grey m-5 p-5 w-full h-[80vh] rounded-md drop-shadow-xl">
                    {showingData &&
                        <p>{name}</p>
                    }
                </div>
            </div>

        </>
    )
}