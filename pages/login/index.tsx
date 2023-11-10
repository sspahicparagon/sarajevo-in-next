import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import pageStyle from '../../styles/Login.module.css';
import { ImageStorage } from "../../values/GlobalValues";
import { signIn } from "next-auth/react";

const Login: NextPage = () => {

    function handleSubmit(event: any) {
        event?.preventDefault();
        let form = event?.target;
        let username = form.elements[0].value;
        let password = form.elements[1].value
        signIn('credentials', {username, password, redirect: true, callbackUrl: '/'});
    }

    return (
        <>
            <Head>
                <title>Login Page</title>
            </Head>
            <Flex
                height={'100vh'}
                flexDirection={'column'}
                className={pageStyle.container}
                backgroundImage={`${ImageStorage}/public/images/track-images/track-image-8.webp`}
            >
                <Head>
                    <meta property="og:image" content={`${ImageStorage}/public/images/track-images/track-image-8.webp`} />
                    <title>SarajevoIN - Log In</title>
                </Head>
                <form onSubmit={handleSubmit}>
                    <FormControl
                        width={'350px'}
                        flexDirection={'column'}
                        className={pageStyle.form}
                    >
                        <FormLabel>Username</FormLabel>
                        <Input isRequired type={'text'} />
                        <FormLabel>Password</FormLabel>
                        <Input isRequired type={'password'} />
                        <Button
                            className={pageStyle.button}
                            variant={'solid'}
                            type={'submit'}
                        >Log In</Button>
                    </FormControl>
                </form>
            </Flex>
        </>
    )
}

export async function getStaticProps(context: any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['footer', 'common'])),
            revalidate: 3600
        }
    };
}

export default Login;