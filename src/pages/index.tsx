import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-bold">Pantore Dev</h1>
        <p>Welcome to <b>Pantore Dev</b>, a full-stack application built with Next.js that integrates both the backend and frontend into a single repository. It was developed as part of a technical challenge for <Link href="https://pantorepay.com.br">Pantore Pay</Link>. Feel free to check out the repository on <b>GitHub</b>.</p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button 
            type="button" 
            className="rounded-full" 
            asChild
          >
            <Link
              href="/dashboard"
              target="_blank"
            >
              Go to dashboard
            </Link>
          </Button>

          <Button 
            type="button" 
            variant="secondary" 
            className="rounded-full" 
            asChild
          >
            <Link
              href="https://github.com/enriqueprieto/pantore-backend-dev"
              target="_blank"
            >
              <Github />

              Go to repository
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
