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

export { getPagePaths };