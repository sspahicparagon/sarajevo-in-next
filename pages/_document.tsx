import { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";
import SplashScreen from "../components/SplashScreen";

const Document: NextPage = () => {
    return (
        <Html>
            <Head />
            <body>
                <SplashScreen />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;