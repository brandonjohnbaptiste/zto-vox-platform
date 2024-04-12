'use client'
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import SampleDisplay from "@/components/ui/sample-display";

export default function Page() {
    const supabase = createClient();
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [userSamples, setUserSamples] = useState([]);
    const [selectVal, setSelectVal]: any = useState();
    const [showingData, setShowingData]: boolean = useState(false);
    const [addingSample, setAddingSample] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState();


    async function getUserSamples() {
        const  {data: {user: currentUser}} = await supabase.auth.getUser();

        const {data} = await supabase
            .from('samples')
            .select()
            .eq('created_by', currentUser.id);

        setUserSamples(data);
    }

     async function getUserPlaylists() {
        const  {data: {user: currentUser}} = await supabase.auth.getUser();

        const {data, err} = await supabase
            .from('playlists')
            .select()
            .eq('created_by', currentUser.id);

        setPlaylists(data);
    }

     async function addSong() {
        const {data} = await supabase
            .from('samples')
            .select()
            .eq('file_name', selectVal);

        let newSampleArray = currentPlaylist.samples.concat(data);

        let updatedPlaylist = {...currentPlaylist};
        updatedPlaylist.samples = newSampleArray


        setCurrentPlaylist(updatedPlaylist);

        const {error} = await supabase
            .from('playlists')
            .update({samples: updatedPlaylist.samples})
            .eq('id', updatedPlaylist.id);

        console.log(error);
    }

    function displayPlaylist(playlist) {
        setCurrentPlaylist(playlist);
        setShowingData(true);
    }


    async function createPlaylist() {
        const  {data: {user: currentUser}} = await supabase.auth.getUser();
        const {err} = await supabase
            .from('playlists')
            .insert({playlist_name: playlistName, created_by: currentUser.id, samples: []})
    }

    useEffect(() => {
        getUserPlaylists();
        getUserSamples();
    }, []);

    useEffect(() => {
       getUserPlaylists();
    }, [playlists.length])

    return (
        <>
            <h1 className="text-white uppercase font-[arial] font-bold text-[2rem] m-5">Playlists</h1>
            <div className="flex flex-row">
                <div className="bg-grey m-5 p-5 w-[30vh] h-[80vh] rounded-md drop-shadow-xl flex flex-col justify-between">
                    <div>
                        {playlists.map(playlist => (
                            <button
                                className="bg-accent p-5 my-1 w-[100%] rounded-md text-white text-[1.2rem] font-[arial]  hover:bg-accent/80"
                                key={playlist.id}
                                onClick={() => {
                                    setShowingData(false);
                                    getUserPlaylists().then(() => displayPlaylist(playlist))
                                }}
                            >{playlist.playlist_name}
                            </button>
                        ))}
                    </div>
                    <div>
                        <input
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            type="text"
                            placeholder="Playlist name..."
                            className="bg-background-light text-white font-[arial] p-4 rounded-md focus:border-none"
                        />
                        <button
                            className="bg-accent p-2 w-[100%] my-2 text-white font-[arial] font-bold uppercase hover:bg-accent/70"
                            onClick={() => {
                                createPlaylist();
                                setPlaylistName('');
                                getUserPlaylists();
                            }}
                        >Add new playlist</button>
                    </div>

                </div>
                <div className="bg-grey m-5 p-5 w-full h-[80vh] rounded-md drop-shadow-xl">
                    {showingData &&
                        <div>
                            <SampleDisplay playlist={currentPlaylist}/>
                            <button onClick={() => setAddingSample(true)}>Add Sample</button>
                        </div>
                    }

                    {addingSample &&
                        <div>
                            <select
                                value={selectVal}
                                onChange={(e) => {
                                    setSelectVal(e.target.value)
                                }}
                                className="bg-accent p-4 font-[arial] text-white rounded-md drop-shadow-xl"
                            >
                                <option value='1' disabled>Select a sample...</option>
                                {userSamples.map(sample => (
                                    <option key={sample.id} value={sample.file_name}>{sample.file_name}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => {
                                        setShowingData(false);
                                        addSong().then(() => setShowingData(true));
                                    }
                                }
                            >Add to playlist</button>
                        </div>

                    }

                </div>
            </div>

        </>
    )
}