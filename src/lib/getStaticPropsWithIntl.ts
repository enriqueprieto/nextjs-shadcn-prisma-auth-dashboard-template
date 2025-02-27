import { GetStaticProps } from 'next';

export const getStaticPropsWithIntl = (namespace?: string): GetStaticProps => async ({ locale }) => {
    let messages = (await import(`../locales/${locale || 'en'}.json`)).default;
    if (namespace && messages[namespace]) {
        messages = messages[namespace];
    }
    return {
        props: {
            messages: messages,
        },
    };
};
