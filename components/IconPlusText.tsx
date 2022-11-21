import { Image } from '@chakra-ui/react';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconPlusTextConfig {
    image?: string;
    link?: string;
    text?: string;
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    maxWidth?: string;
    alignSelf?: string;
    backgroundColor?: string;
    imageFa?: IconDefinition;
}
export default function IconPlusText({
    image,
    imageFa = undefined,
    link = '/',
    text = '',
    width = '100%',
    height = '100%',
    minWidth = '75px',
    minHeight = '75px',
    maxHeight = '250px',
    maxWidth = '250px',
    alignSelf = "center",
    backgroundColor = 'none' }: IconPlusTextConfig) {

    return (
        <>
            <a href={link} style={{
                alignSelf: alignSelf,
                color: 'lightgray',
                marginInline: '2px',
                fontSize: 'smaller'
            }}>
                <>
                    {imageFa == undefined ?
                        <Image src={image} style={{
                            width: width,
                            height: height,
                            minWidth: minWidth,
                            minHeight: minHeight,
                            maxHeight: maxHeight,
                            maxWidth: maxWidth,
                            position: 'relative',
                            top: '0',
                            left: '0',
                            backgroundColor: backgroundColor
                        }} />
                        :
                        <FontAwesomeIcon
                            size={'xl'}
                            icon={imageFa}
                            color={'lightgray'}
                            style={{ marginRight: '2px' }}
                        />
                    }
                    {text?.length > 0 &&
                        <span>{text}</span>
                    }
                </>
            </a>
        </>
    )
}