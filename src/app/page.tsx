import Image from "next/image";

export default function Page() {
  return (
      <main className="grid grid-rows-10 grid-cols-4 h-screen place-items-center">
          <div className="row-span-7 col-span-4 w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-center text-8xl cols-span-4 font-bold drop-shadow-xl ">VOX MATCH</h1>
              <button className="cols-span-2 w-[200px] p-4 bg-accent rounded-full m-10 place-self-center">LOG IN</button>
          </div>
          <Image
              className="row-span-2 col-span-4"
              src="/zto-logo.png"
              width={300}
              height={300}
              alt="Company logo"
          />
      </main>
  );
}
