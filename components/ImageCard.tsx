import Link from "next/link";
import carouselStyle from '../styles/Carousel.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Image from "next/image";
import imageLoader from "../lib/imageLoader";
import { ImageStorage } from "../values/GlobalValues";
import { useRouter } from "next/router";

interface CardConfig {
    image?: string;
    text?: string;
    link?: string;
    enableClick?: boolean;
    index?: number;
}

export default function Card({ image = "", text = "", link = "", enableClick = true, index }: CardConfig) {
    const { locale } = useRouter();
    return (
        <>
            {enableClick ?
                <Link href={link} locale={locale}>
                    <div className={carouselStyle.card} >
                        <Image
                            className={carouselStyle["card-image"]}
                            src={`${image}`}
                            loader={imageLoader}
                            layout={'fill'}
                            objectFit={'cover'}
                            objectPosition={'50% 50%'}
                            blurDataURL={`${ImageStorage}/Eclipse-1s-200px.gif`}
                            placeholder={'blur'}
                            alt={text}
                        />
                        <div className={carouselStyle['card-text']}><strong>{text}</strong></div>
                    </div>
                </Link>
                :
                <div className={carouselStyle.card}>
                    <Image
                        className={carouselStyle["card-image"]}
                        src={`${image}`}
                        loader={imageLoader}
                        layout={'fill'}
                        objectFit={'cover'}
                        objectPosition={'50% 50%'}
                        placeholder={'blur'}
                        blurDataURL={'https://via.placeholder.com/500.webp/004E69'}
                        alt={text}
                    />
                    <div className={carouselStyle['card-text']}><strong>{text}</strong></div>
                </div>
            }
        </>
    );
};