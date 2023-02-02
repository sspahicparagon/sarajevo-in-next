import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import carouselStyle from "../styles/Carousel.module.css";
import Card from "./ImageCard";
import { location } from '@prisma/client';

interface CarouselConfig {
    width?: string;
    height?: string;
    items?: location[];
    enableClick?: boolean;
}

export default function ChakraCarousel({
    width = 'auto',
    height = 'auto',
    items = [],
    enableClick = true
}: CarouselConfig) {
    const [index, setIndex] = useState(0);
    const [displayButtons, setDisplayButtons] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [displayItemsCount, setDisplayItemsCount] = useState(3);

    useEffect(() => {
        if (displayButtons !== items.length > displayItemsCount)
            setDisplayButtons(items.length > displayItemsCount);
    }, []);

    const sliderButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        let left: boolean = event.currentTarget.classList.contains(carouselStyle['left-carousel-button']);
        let right: boolean = event.currentTarget.classList.contains(carouselStyle['right-carousel-button']);

        if (left) {
            if (index - 1 < 0) setIndex(Math.ceil(items.length / displayItemsCount) - 1);
            else setIndex(index - 1);
        }
        else if (right) {
            if (index + 1 >= Math.ceil(items.length / displayItemsCount)) setIndex(0);
            else setIndex(index + 1);
        }
    };

    return (
        <Flex
            height={height}
            width={width}
            className={carouselStyle.row}
            key={Math.random()}
        >
            {(displayButtons) && <IconButton
                aria-label="left-arrow"
                className={carouselStyle['left-carousel-button']}
                onClick={(e) => sliderButtonClick(e)}>
                <ArrowLeftIcon scale="80px" />
            </IconButton>
            }
            <Flex
                style={{ 'transform': `translateX(${index * -100}%)` }}
                className={carouselStyle['chakra-carousel-slyder']}
                ref={ref}
            >
                {items?.map((_) => {
                    let detailsLink: string = `details/${_?.LocationID}`
                    return (<Card key={_?.LocationID} image={_?.Image} link={detailsLink} enableClick={enableClick} />)
                })}
            </Flex>
            {(displayButtons) && <IconButton
                aria-label="right-arrow"
                className={carouselStyle['right-carousel-button']}
                onClick={(e) => sliderButtonClick(e)}>
                <ArrowRightIcon scale="80px" />
            </IconButton>
            }
        </Flex>
    )
}