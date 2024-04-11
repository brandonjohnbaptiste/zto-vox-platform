import {useRouter} from "next/router";

export default function Page() {
    const router = useRouter();
    return <h1>Playlist id: {router.query.id}</h1>
}