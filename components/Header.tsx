import { Flex } from "@chakra-ui/react";
import CardElement from "../interfaces/CardElement";
import Slideshow from "./Slideshow";
// import logo from '/images/sarajevo.in-logo.jpg';
import IconPlusText from "./IconPlusText";
import TrackImagesService from "../services/TrackImagesService";
import { useEffect, useState } from "react";
import headerStyle from '../styles/Header.module.css';
import Loading from "./Loading";


export default function Header({ array }: { array: CardElement[] }) {
    // const [array, setArray] = useState<CardElement[] | undefined>(undefined);

    // useEffect(() => {
    //     TrackImagesService.getTrackImages().then((data: CardElement[]) => {
    //         setArray(data);
    //     })
    // }, []);

    return (
        <Flex
            width={'100%'}
            flexDirection={'column'}
            className={headerStyle['header-container']}
        >
            {array == undefined ?
                <Loading color="var(--base-color)" background="white" />
                :
                <Flex
                    flexDirection={'row'}
                >
                    <Flex
                        width={'24vw'}
                        flexDirection={'column'}
                        className={headerStyle['logo-container']}
                    >
                        <IconPlusText image={'/sarajevo.in-logo.jpg'} width={'100%'} height={'100%'} interactionEnabled={false} />
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
                        <IconPlusText image={'/sarajevo.in-logo.jpg'} width={'100%'} height={'100%'} interactionEnabled={false} />
                    </Flex>
                </Flex>
            }
        </Flex>
    );
};