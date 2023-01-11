import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
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
            height={'20vh'}
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
            >
                {title}
            </Flex>
        </Flex>
    )
};

export default PageTitle;