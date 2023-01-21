import { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import SplashScreen from "../components/SplashScreen";

const Document: NextPage = () => {

    return (
        <Html lang="en">
            <Head>
                {/* Google tag (gtag.js) */}
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
                />
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `                    
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
    
                        gtag('config', '${process.env.GA_TRACKING_ID}');`,
                    }}
                />
                <Script
                    async
                    strategy="beforeInteractive"
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GADS_ID}`}
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <SplashScreen />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;