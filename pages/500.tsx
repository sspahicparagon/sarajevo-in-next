import { NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page500: NextPage<SSRConfig> = (props) => {
    const { t } = useTranslation(props._nextI18Next?.ns);

    return (
        <h1>500</h1>
    )
}

export async function getStaticProps(context: any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
            revalidate: 3600
        }
    };
}

export default Page500;