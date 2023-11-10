import { ImageStorage } from "../values/GlobalValues";

interface ImageLoaderConfig {
    src?: string;
    width?: number;
    quality?: number;
}
export default function imageLoader({ src, width, quality }: ImageLoaderConfig) {
    let res = src?.split('.');
    let newSrc: string = "";
    let result: string = "";
    if (quality) newSrc = `${res?.at(0)}-1.${res?.at(1)}`;

    if (newSrc != "") result = `${ImageStorage}/public${newSrc}`;
    else result = `${ImageStorage}/public${src}`;

    return result;
}

export const wordpressImageLoader = ({src, width, quality}: ImageLoaderConfig) => {
    return src!;
}