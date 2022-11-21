import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CardElement from "../interfaces/CardElement";
import carouselStyle from "../styles/Carousel.module.css";
import Card from "./ImageCard";

interface CarouselConfig {
    width?: string;
    height?: string;
    items?: CardElement[];
    enableClick?: boolean;
    displayItems: number;
}

export default function ChakraCarousel({
    width = 'auto',
    height = 'auto',
    items = [],
    enableClick = true,
    displayItems = 6
}: CarouselConfig) {
    const [index, setIndex] = useState(0);
    const [displayButtons, setDisplayButtons] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (displayButtons !== items.length > displayItems)
            setDisplayButtons(items.length > displayItems);
    }, [displayItems]);

    const sliderButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        let left: boolean = event.currentTarget.classList.contains(carouselStyle['left-carousel-button']);
        let right: boolean = event.currentTarget.classList.contains(carouselStyle['right-carousel-button']);
        var itemsPerScreen: number = parseInt(getComputedStyle(ref.current!!).getPropertyValue('--items-per-screen'));

        if (left) {
            if (index - 1 < 0) setIndex(Math.ceil(items.length / itemsPerScreen) - 1);
            else setIndex(index - 1);
        }
        else if (right) {
            if (index + 1 >= Math.ceil(items.length / itemsPerScreen)) setIndex(0);
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
                {items.map((element: CardElement) => {
                    let detailsLink: string = `details/${element.LocationID}`
                    return (<Card key={element.LocationID} image={element.Image} text={element.Name} link={detailsLink} enableClick={enableClick} />)
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