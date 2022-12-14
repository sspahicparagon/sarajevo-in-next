import CardElement from "../interfaces/CardElement";
import slideshowStyle from '../styles/Slideshow.module.css';
import { useEffect, useState } from "react";
import Document from "next/document";
import { ImageStorage } from "../values/GlobalValues";
import Image from 'next/image';
import imageLoader from "../lib/imageLoader";

interface SlideshowConfig {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    items?: CardElement[];
}
const Slideshow = ({ width = '250px', height = '450px', maxHeight = '450px', maxWidth = '650px', items = [] }: SlideshowConfig) => {
    const [array, setArray] = useState<CardElement[]>();
    const trueItemWidth = parseInt(width.split('px')[0]);

    useEffect(() => {

        setArray([...items, items[0], items[1], items[2]]);
        if (Document !== undefined) {
            document.documentElement.style.setProperty('--slideshow-item-width', trueItemWidth + 'px');
            document.documentElement.style.setProperty('--slideshow-item-count', items.length + '');
        }
    }, [items]);

    return (
        <>
            <div className={slideshowStyle.slider}
                style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
            >
                <>
                    <div className={slideshowStyle["slide-track"]}
                        style={{ width: `${array?.length!! * trueItemWidth}px` }}
                    >
                        {
                            array?.map((card: CardElement, index: number) => {
                                if (card == undefined) return;
                                let placeholderSrc: string = ImageStorage + '/Eclipse-1s-200px.gif';
                                return (
                                    <>
                                        <div key={Math.random()} className={slideshowStyle.slide}
                                            style={{ width: width, height: height }}
                                        >
                                            <Image
                                                src={`${card.Image}`}
                                                loader={imageLoader}
                                                layout={'fill'}
                                                objectFit={'cover'}
                                                objectPosition={'50% 50%'}
                                                placeholder={'blur'}
                                                alt={'Image'}
                                                blurDataURL={placeholderSrc}
                                                className={slideshowStyle['slide-image']}
                                                priority={true}
                                            />
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </>
            </div>
        </>
    )
}

export default Slideshow;