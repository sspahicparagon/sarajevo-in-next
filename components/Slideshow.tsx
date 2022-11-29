import CardElement from "../interfaces/CardElement";
import slideshowStyle from '../styles/Slideshow.module.css';
import { useEffect, useState } from "react";
import Document from "next/document";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageStorage } from "../values/GlobalValues";

interface SlideshowConfig {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    items?: CardElement[];
}
export default function Slideshow({ width = '250px', height = '450px', maxHeight = '450px', maxWidth = '650px', items = [] }: SlideshowConfig) {
    const [array, setArray] = useState<CardElement[]>();
    const trueItemWidth = parseInt(width.split('px')[0]);

    useEffect(() => {

        setArray([...items, items[0], items[1]]);
        if (Document !== undefined) {
            document.documentElement.style.setProperty('--slideshow-item-width', trueItemWidth + 'px');
            document.documentElement.style.setProperty('--slideshow-item-count', items.length + '');
        }
    }, [items]);

    return (
        <>
            <div className={slideshowStyle.slider}
                style={{ maxWidth: maxWidth, maxHeight: maxHeight }}>
                <div className={slideshowStyle["slide-track"]}>
                    {
                        array?.map((card: CardElement) => {
                            if (card == undefined) return;
                            let placeholderSrc: string = ImageStorage + '/Eclipse-1s-200px.gif';
                            return (
                                <div key={Math.random()} className={slideshowStyle.slide} style={{ maxWidth: maxWidth, maxHeight: maxHeight }}>
                                    <LazyLoadImage
                                        src={`${ImageStorage}${card.Image}`}
                                        width={width}
                                        placeholderSrc={placeholderSrc}
                                        height={height}
                                        effect={'blur'}
                                        alt={'Image'}
                                        className={slideshowStyle['slide-image']}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}