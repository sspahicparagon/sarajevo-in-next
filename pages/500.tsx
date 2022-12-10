import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page500: NextPage = () => {
    return (
        <h1>500</h1>
    )
}

export async function getStaticProps(context: any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            revalidate: 3600
        }
    };
}

export default Page500;