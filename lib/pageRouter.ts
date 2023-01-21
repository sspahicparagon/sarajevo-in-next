const getPagePaths = function (context: any, array: any[], key: string) {
    const paths = array.flatMap(_ => {
        return context.locales.map((locale: string) => {
            return {
                params: {
                    id: _[key].toString()
                },
                locale: locale
            }
        });
    });

    return paths;
}

const gaPageView = (url: string, title: string) => {
    window.gtag('config', process.env.GA_TRACKING_ID, {
        page_location: url,
        page_title: title,
    });
};

export { getPagePaths, gaPageView };