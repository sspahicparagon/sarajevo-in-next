import Link from "next/link";
import carouselStyle from '../styles/Carousel.module.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loading from "./Loading";
import Image from "next/image";

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
                        <Image
                            className={carouselStyle["card-image"]}
                            src={`http://sarajevoin.ba/public${image}`}
                            layout={'fill'}
                            objectFit={'cover'}
                            objectPosition={'50% 50%'}
                            placeholder={'blur'}
                            blurDataURL={`http://sarajevoin.ba/public/placeholder${image}`}
                            alt={text}
                        />
                        <div className={carouselStyle['card-text']}><strong>{text}</strong></div>
                    </div>
                </Link>
                :
                <div className={carouselStyle.card}>
                    <Image
                        className={carouselStyle["card-image"]}
                        src={`http://sarajevoin.ba/public${image}`}
                        width={'100%'}
                        height={'160%'}
                        layout={'responsive'}
                        blurDataURL={`http://sarajevoin.ba/public/placeholder${image}`}
                        alt={text}
                    />
                    <div className={carouselStyle['card-text']}><strong>{text}</strong></div>
                </div>
            }
        </>
    );
};