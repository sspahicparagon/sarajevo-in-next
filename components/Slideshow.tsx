import CardElement from "../interfaces/CardElement";
import slideshowStyle from '../styles/Slideshow.module.css';
import { useEffect, useState } from "react";
import Document from "next/document";
import { ImageLoadSpinner, ImageStorage, PriorityLoadTreshold } from "../values/GlobalValues";
import Image from 'next/image';
import imageLoader from "../lib/imageLoader";

interface SlideshowConfig {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    items?: CardElement[];
}
const Slideshow = ({ width = '250px', height = '450px', maxHeight = '450px', maxWidth = '90vw', items = [] }: SlideshowConfig) => {
    const [array, setArray] = useState<CardElement[]>();
    let trueItemWidth = parseInt(width.split('px')[0]);

    useEffect(() => {
        const addedElementsToEnd = [...items].splice(0, Math.floor(items.length) / 3);
        if (Document !== undefined) {
            document.documentElement.style.setProperty('--slideshow-item-width', trueItemWidth + 'px');
            document.documentElement.style.setProperty('--slideshow-item-count', items.length + '');
        }
        setArray([...items, ...addedElementsToEnd]);
    }, [items]);

    return (
        <div className={slideshowStyle.slider}
            style={{ maxWidth: maxWidth }}
        >
            <div className={slideshowStyle["slide-track"]}
                style={{ width: `${array?.length!! * trueItemWidth}px` }}
            >
                {
                    array?.map((card: CardElement, index: number) => {
                        if (card == undefined) return;
                        let placeholderSrc: string = ImageStorage + ImageLoadSpinner;
                        return (
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
                                    alt={'Image of Sarajevo'}
                                    blurDataURL={placeholderSrc}
                                    className={slideshowStyle['slide-image']}
                                    priority={index < PriorityLoadTreshold}
                                    quality={'1'}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Slideshow;