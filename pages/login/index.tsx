import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import JWTService from "../../services/JWTService";
import pageStyle from '../../styles/Login.module.css';
import { ImageStorage } from "../../values/GlobalValues";

const Login: NextPage = () => {

    function handleSubmit(event: any) {
        event?.preventDefault();
        let form = event?.target;
        let username = form.elements[0].value;
        let password = form.elements[1].value
        JWTService.login(username, password).then((result: { success: boolean }) => {
            if (result.success) Router.push('/');
            else Router.push('/login');
        })
    }

    return (
        <Flex
            height={'100vh'}
            flexDirection={'column'}
            className={pageStyle.container}
            backgroundImage={`${ImageStorage}/images/track-images/track-image-8.JPG`}
        >
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
    )
}

export async function getStaticProps(context: any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common']))
        }
    };
}

export default Login;