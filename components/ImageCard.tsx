import Link from "next/link";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Image from "next/image";
import imageLoader from "../lib/imageLoader";
import { ImageLoadSpinner, ImageStorage } from "../values/GlobalValues";
import { useRouter } from "next/router";

interface CardConfig {
    image?: string;
    link?: string;
    enableClick?: boolean;
    index?: number;
    alt?: string;
}

export default function Card({ image = "", link = "", enableClick = true, index, alt = "Image" }: CardConfig) {
    const { locale } = useRouter();
    return (
        <>
            {enableClick ?
                <Link href={link} locale={locale}>
                    <div>
                        <Image
                            src={`${image}`}
                            loader={imageLoader}
                            layout={'fill'}
                            objectFit={'cover'}
                            objectPosition={'50% 50%'}
                            blurDataURL={`${ImageStorage}${ImageLoadSpinner}`}
                            placeholder={'blur'}
                            alt={alt}
                        />
                    </div>
                </Link>
                :
                <div>
                    <Image
                        src={`${image}`}
                        loader={imageLoader}
                        layout={'fill'}
                        objectFit={'cover'}
                        objectPosition={'50% 50%'}
                        placeholder={'blur'}
                        blurDataURL={`${ImageStorage}${ImageLoadSpinner}`}
                        alt={alt}
                    />
                </div>
            }
        </>
    );
};