import CardElement from "../interfaces/CardElement";
import slideshowStyle from '../styles/Slideshow.module.css';
import { ReactElement, useEffect, useState } from "react";
import Document from "next/document";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface SlideshowConfig {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    items?: CardElement[];
}
export default function Slideshow({ width = '250px', height = '450px', maxHeight = '450px', maxWidth = '450px', items = [] }: SlideshowConfig) {
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
                            let placeholderSrc: string = '/placeholder' + card.Image?.substring(0, card.Image.indexOf('.')) + ".jpeg";
                            return (
                                <div key={Math.random()} className={slideshowStyle.slide} style={{ maxWidth: maxWidth, maxHeight: maxHeight }}>
                                    <LazyLoadImage
                                        src={card.Image!!}
                                        // style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
                                        width={width}
                                        placeholderSrc={placeholderSrc}
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