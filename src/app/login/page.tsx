'use client'


import {useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {mapIncludes} from "yaml/dist/compose/util-map-includes";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const supabase = createClientComponentClient();

    const signUp = async () => {
        await supabase.auth.signUp({
           email,
           password
        });
        router.refresh();
    }


    const signIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password
        });
        router.refresh();
    }

    return (
        <div>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(event => setEmail(event.target.value))}
            />

            <input
                type="password"
                name="password"
                value={password}
                onChange={(event => setPassword(event.target.value))}
            />
        </div>
    )

}