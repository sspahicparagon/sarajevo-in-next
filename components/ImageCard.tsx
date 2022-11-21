import Link from "next/link";
import { Image } from "@chakra-ui/react";
import carouselStyle from '../styles/Carousel.module.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

interface CardConfig {
    image?: string;
    text?: string;
    link?: string;
    enableClick?: boolean;
    index?: number;
}

export default function Card({ image = "", text = "", link = "", enableClick = true, index }: CardConfig) {
    return (
        <>
            {enableClick ?
                <Link href={link}>
                    <div className={carouselStyle.card} >
                        <LazyLoadImage
                            className={carouselStyle["card-image"]}
                            src={image}
                            width={'100%'}
                            height={'100%'}
                            placeholderSrc={'/placeholder' + image}
                            effect={'blur'}
                            alt={text}
                        />
                        <div className={carouselStyle['card-text']}><strong>{text}</strong></div>
                    </div>
                </Link>
                :
                <div className={carouselStyle.card}>
                    <LazyLoadImage
                        className={carouselStyle["card-image"]}
                        src={image}
                        width={'100%'}
                        height={'100%'}
                        placeholderSrc={'/placeholder' + image}
                        effect={'blur'}
                        alt={text}
                    />
                    <div className={carouselStyle['card-text']}><strong>{text}</strong></div>
                </div>
            }
        </>
    );
};