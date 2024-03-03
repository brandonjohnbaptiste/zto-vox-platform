import Image from "next/image";

export default function Page() {
  return (
      <main className="grid grid-rows-10 grid-cols-4 h-screen place-items-center items-center">
          <div className="row-span-7 col-span-4">
              <h1 className="text-center text-8xl cols-span-4 font-bold">VOX MATCH</h1>
              <button className="cols-span-2">LOG IN</button>
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
