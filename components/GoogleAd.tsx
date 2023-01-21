import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const GoogleAdHorizontal = () => {

    useEffect(() => {
        if (!(window.adsbygoogle?.length != 0))
            (window.adsbygoogle = window.adsbygoogle || []).push({})
    }, []);
    return (
        <Flex
            width={'100%'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
        >
            {/* Sarajevoin-Ads-Normal */}
            <ins className="adsbygoogle"
                style={{ "display": "block" }}
                data-ad-client={process.env.GAD_ID}
                data-ad-slot="6076416628"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </Flex>
    )
}

const GoogleAdSquare = () => {

    useEffect(() => {
        if (!(window.adsbygoogle?.length != 0))
            (window.adsbygoogle = window.adsbygoogle || []).push({})
    }, []);

    return (
        <Flex
            width={'100%'}
            flexDirection={'column'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            {/* Sarajevoin-Ads-Normal-Square */}
            <ins className="adsbygoogle"
                style={{ "display": "block" }}
                data-ad-client={process.env.GAD_ID}
                data-ad-slot="6317758072"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </Flex>
    )
}

export { GoogleAdHorizontal, GoogleAdSquare };