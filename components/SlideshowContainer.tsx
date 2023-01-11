import { Flex, Text } from "@chakra-ui/react";
import CardElement from "../interfaces/CardElement";
import Slideshow from "./Slideshow";
import headerStyle from '../styles/Header.module.css';
import Loading from "./Loading";


export default function SlideshowContainer({ array }: { array: CardElement[] }) {
    if (array == undefined) return <Loading color="var(--base-color)" background="var(--color-gray)" />;
    return (
        <Flex
            flexDirection={'column'}
            className={headerStyle['header-container']}
        >
            <Flex
                flexDirection={'row'}
                className={`center`}
            >
                <Flex
                    className={headerStyle['slideshow-container']}
                    flexDirection={'column'}
                >
                    <>
                        <Slideshow items={array} />
                    </>
                </Flex>
            </Flex>
        </Flex>
    );
};