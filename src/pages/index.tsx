import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { getStaticPropsWithIntl } from "@/lib/getStaticPropsWithIntl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const getStaticProps = getStaticPropsWithIntl();

export default function Home() {
  const t = useTranslations();
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-bold">Dashboard Template</h1>

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
