'use client'

import {ReactNode, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import cn from "@/utils/cn";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {createClient} from "@/utils/supabase/client";

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();


    const supabase = createClient();

    const signUp = async () => {
        const data = await supabase.auth.signUp({
           email,
           password
        });


        const date = new Date().toISOString();
        const { error } = await supabase
            .from('users')
            .insert([{id: data.data.user.id, created_at: date, username: username, name: name, user_type: 0}]);

        setEmail('');
        setPassword('');
        setUsername('');
        setName('');


    }


    const signIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password
        });

        const { data: {user} } = await supabase.auth.getUser();
        console.log(user);

        if (user) {
            setEmail('');
            setPassword('');
            router.push('/home');
        } else {
            // display error
        }
    }

    return (
        <div className="max-w-md w-full h-inherit mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black self-center">
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email"
                       placeholder="example@mail.com"
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password"
                       placeholder="••••••••"
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Username</Label>
                <Input id="username"
                       placeholder="@username"
                       type="text"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Name</Label>
                <Input id="name"
                       placeholder="Your Name"
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                />
            </LabelInputContainer>
            <button
                className="hover:bg-opacity-90 mb-4 relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input  bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                onClick={signUp}
            >
                <span className="text-neutral-300 text-sm">Sign Up</span>
            </button>
            <button
                className="hover:bg-opacity-90 relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input  bg-accent shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                onClick={signIn}
            >
                <span className="text-neutral-300 text-sm">Sign In</span>
            </button>

        </div>

    )

}