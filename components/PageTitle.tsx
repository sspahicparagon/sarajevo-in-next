import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import pageTitleStyle from "../styles/PageTitle.module.css";

interface PageTitleConfig {
    title?: string;
    returnUrl?: string;
}

const PageTitle = ({ title = "", returnUrl = "/" }: PageTitleConfig) => {
    const router = useRouter();

    return (
        <Flex
            minHeight={'var(--page-title-height)'}
            width={'100%'}
            className={pageTitleStyle['title-container']}
            flexDirection={'row'}
        >
            <Flex
                flexDirection={'column'}
                onClick={() => { router.push({ pathname: returnUrl }) }}
                className={`link-interaction ${pageTitleStyle['back-button']}`}
            >
                <ArrowBackIcon fontSize={'4xl'} />
            </Flex>
            <Flex
                className={pageTitleStyle['heading-text']}
                flexDirection={'column'}
                width={'100%'}
                justifyContent={{ 'base': 'flex-end', 'md': 'center' }}
                paddingBottom={{ 'base': '15px', 'md': '0' }}
            >
                <Heading
                    as={'h1'}
                    fontSize={{'base': 'x-large', 'sm': 'x-large', 'md': 'xx-large'}}
                >
                    {title}
                </Heading>
            </Flex>
        </Flex>
    )
};

export default PageTitle;