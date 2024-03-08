'use client'


import {ReactNode, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {mapIncludes} from "yaml/dist/compose/util-map-includes";
import cn from "@/utils/cn";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

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
    const router = useRouter();


    const supabase = createClientComponentClient();

    const signUp = async () => {
        await supabase.auth.signUp({
           email,
           password
        });
        router.refresh();
        setEmail('');
        setPassword('');
    }


    const signIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password
        });
        router.refresh();
        setEmail('');
        setPassword('');
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