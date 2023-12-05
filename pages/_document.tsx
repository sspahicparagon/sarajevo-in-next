import { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

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
                <Script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-5SLWQ7WD');`,
                    }}
                    id="gtag-manager-init"
                />
                {/* <!-- Start cookieyes banner -->  */}
                <script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/b268ae0794b933d674632154/script.js" async></script> 
                {/* <!-- End cookieyes banner --> */}
            </Head>
            <body>
                <noscript>
                    <iframe 
                        src="https://www.googletagmanager.com/ns.html?id=GTM-5SLWQ7WD"
                        height="0" 
                        width="0" 
                        style={{"display":"none","visibility":"hidden"}}>
                    </iframe>
                </noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;