import { Flex } from "@chakra-ui/react";
import CardElement from "../interfaces/CardElement";
import Slideshow from "./Slideshow";
import logo from '../images/sarajevo.in-logo.jpg';
import IconPlusText from "./IconPlusText";
import TrackImagesService from "../services/TrackImagesService";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import headerStyle from '../styles/Header.module.css';


export default function Header() {
    const [array, setArray] = useState<CardElement[]>([]);

    useEffect(() => {
        TrackImagesService.getTrackImages().then((data: CardElement[]) => {
            setArray(data);
        })
    }, []);

    return (
        <Flex
            width={'100%'}
            flexDirection={'column'}
        >
            <Toolbar />
            <Flex
                flexDirection={'row'}
                className={headerStyle['header-container']}
            >
                <Flex
                    width={'24vw'}
                    flexDirection={'column'}
                    className={headerStyle['logo-container']}
                >
                    <IconPlusText image={logo.src} width={'100%'} height={'100%'} />
                </Flex>
                <Flex
                    width={'50vw'}
                    className={headerStyle['slideshow-container']}
                >
                    <>
                        <Slideshow items={array} />
                    </>
                </Flex>
                <Flex
                    width={'24vw'}
                    flexDirection={'column'}
                    className={headerStyle['logo-container']}
                >
                    <IconPlusText image={logo.src} width={'100%'} height={'100%'} />
                </Flex>
            </Flex>
        </Flex>
    );
};