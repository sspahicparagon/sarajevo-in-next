import { ImageStorage } from "../values/GlobalValues";

interface ImageLoaderConfig {
    src?: string;
    width?: number;
    quality?: number;
}
export default function imageLoader({ src, width, quality }: ImageLoaderConfig) {
    return `${ImageStorage}${src}?w=${width}&q=${quality || 75}`
}