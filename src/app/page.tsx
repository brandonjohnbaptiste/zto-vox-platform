'use client';
import Image from "next/image";
import {Button} from "@/components/ui/moving-border";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
      <main className="grid grid-rows-10 h-[90%] w-[90%] grid-cols-4 place-items-center bg-background-light rounded-md self-center mx-auto drop-shadow-2xl">
          <div className="z-20 row-span-7 col-span-4 w-full h-full flex flex-col items-center justify-center">
              <h1 className="mb-10 drop-shadow-xl text-center text-8xl cols-span-4 text-transparent font-bold bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">VOX MATCH</h1>
              <Button
                  className="text-white cols-span-2 text-[1rem]  p-4 bg-accent  hover:scale-110"
                  onClick={() => router.push('/sign-up')}
              >
                  SIGN IN
              </Button>
          </div>
          <Image
              className="row-span-2 col-span-4"
              src="/zto-logo.png"
              width={200}
              height={200}
              alt="Company logo"
          />
      </main>
  );
}
