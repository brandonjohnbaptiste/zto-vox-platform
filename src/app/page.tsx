import Image from "next/image";

export default function Page() {
  return (
      <main>
          <h1>VOX MATCH</h1>
          <button>LOG IN</button>
          <Image
              src="/zto-logo.png"
              width={300}
              height={300}
              alt="Company logo"
          />
      </main>
  );
}
