import DashboardLayout from "@/layouts/dashboard";
import { getStaticPropsWithIntl } from "@/lib/getStaticPropsWithIntl";
import { useTranslations } from "next-intl";
import Head from "next/head";

export const getStaticProps = getStaticPropsWithIntl();

const Page = () => {
    const t = useTranslations();

    return (
        <DashboardLayout>
            <Head>
                <title>{t('Dashboard.title')}</title>
            </Head>

            <div>
                <h2 className="text-4xl font-medium mb-2">{t('Dashboard.title')}</h2>
                <p className="text-xl font-light mb-2">{t('Dashboard.description')}</p>
            </div>
        </DashboardLayout>
    );
};


export default Page;