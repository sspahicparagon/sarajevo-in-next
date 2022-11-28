interface ImageLoaderConfig {
    src?: string;
    width?: number;
    quality?: number;
}
export default function imageLoader({ src, width, quality }: ImageLoaderConfig) {
    return `http://sarajevoin.ba/public${src}?w=${width}&q=${quality || 75}`
}