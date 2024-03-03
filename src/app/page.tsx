import Image from "next/image";
import {BackgroundBeams} from "@/components/ui/background-beams";

export default function Page() {
  return (
      <main className="grid grid-rows-10 h-[90%] w-[90%] grid-cols-4 place-items-center bg-background-light rounded-md self-center mx-auto drop-shadow-2xl">
          <div className="row-span-7 col-span-4 w-full h-full flex flex-col items-center justify-center">
              <h1 className="drop-shadow-xl text-center text-8xl cols-span-4 text-transparent font-bold bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">VOX MATCH</h1>
              <button className="text-white cols-span-2 w-[200px] p-4 bg-accent rounded-full m-10 place-self-center hover:scale-110">SIGN IN</button>
          </div>
          <Image
              className="row-span-2 col-span-4"
              src="/zto-logo.png"
              width={200}
              height={200}
              alt="Company logo"
          />
          <BackgroundBeams/>
      </main>
  );
}
