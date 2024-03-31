import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Loading from "@/app/loading";
import {Suspense} from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vox Match",
  description: "An online platform for matching vocals to samples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html>
          <body className="font-[arial] bg-background w-full h-screen flex items-stretch bg-dot-white/[0.2]">
              <Suspense fallback={<Loading />}>
                  {children}
              </Suspense>
          </body>
      </html>

  );
}
