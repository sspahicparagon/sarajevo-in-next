import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import pageStyle from '../styles/Page404.module.css';

const Page404: NextPage = function () {
    return (
        <Flex
            height={'100vh'}
            className={pageStyle.container}
        >
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

export default Page404;