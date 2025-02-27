import "@/styles/globals.css";
import {NextIntlClientProvider} from 'next-intl';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AppLayout from "@/layouts/app";

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
      <SessionProvider session={session}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}
