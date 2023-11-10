import { NextRouter } from "next/router";

const getPagePaths = function (context: any, array: any[], key: string) {
    const paths = array.flatMap(_ => {
        return context.locales.map((locale: string) => {
            return {
                params: {
                    id: encodeURIComponent(_[key].toString())
                },
                locale: locale
            }
        });
    });

    return paths;
};

const gaPageView = (url: string, title: string) => {
    window.gtag('config', process.env.GA_TRACKING_ID, {
        page_location: url,
        page_title: title,
    });
};

const redirectTo404IfNotProvided = (data: any | null | undefined, router: NextRouter) => {
    if((!data || data == null) && typeof window !== 'undefined')
        router.push('/404');
}   

export { getPagePaths, gaPageView, redirectTo404IfNotProvided };