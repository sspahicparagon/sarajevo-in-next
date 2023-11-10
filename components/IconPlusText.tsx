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
    interactionEnabled?: boolean;
    openInNewTab?: boolean;
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
    backgroundColor = 'none',
    interactionEnabled = true,
    openInNewTab = false }: IconPlusTextConfig) {

    return (
        <>
            <a
                target={openInNewTab ? '_blank' : '_parent'}
                rel="noreferrer"
                href={link}
                style={{
                    alignSelf: alignSelf,
                    color: 'var(--color-gray)',
                    marginInline: '2px',
                    fontSize: 'smaller'
                }}
                className={interactionEnabled ? 'link-interaction' : ''}
                id={image ?? "link"}
            >
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
                        }}
                            alt={'Image load failed.'}
                        />
                        :
                        <FontAwesomeIcon
                            size={'lg'}
                            icon={imageFa}
                            color={'var(--color-gray)'}
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