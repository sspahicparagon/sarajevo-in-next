import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import pageStyle from '../styles/Page404.module.css';
import { TranslationType } from "../interfaces/TranslationType";
import Head from "next/head";

const Page404: NextPage<SSRConfig> = function (props) {
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);

    return (
        <Flex
            height={'100vh'}
            className={pageStyle.container}
        >

            <Head>
                <title>404 Page</title>
            </Head>
            <Flex
                height={'100%'}
                width={'100%'}
                flexDirection={'column'}
                className={pageStyle['image-container']}
            >
                <Flex
                    className={pageStyle.title}
                >
                    404
                </Flex>
                <Link href={'/'}>
                    <Text
                        className={pageStyle.text}
                    >Home</Text>
                </Link>
            </Flex>
        </Flex>
    )
}

export async function getStaticProps(context: any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer']))
        }
    };
}

export default Page404;