import { Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ElementInformation from "../interfaces/ElementInformation";
import { faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import informationCardStyle from '../styles/InformationCard.module.css';
import { GoogleMapsUrl } from "../values/GlobalValues";


interface InformationCardConfing {
    title?: string;
    information?: ElementInformation;
}

export default function InformationCard({ title, information }: InformationCardConfing) {
    let locationLink: string = GoogleMapsUrl(`${information?.Latitude},${information?.Longitude}`);
    return (
        <Flex
            flexDirection={'column'}
            minHeight={'100%'}
        >
            <Box
                className={informationCardStyle['title-container']}
            >
                <span><b>{title}</b></span>
            </Box>
            <hr />
            <Flex
                flexDirection={'column'}
                width={'95%'}
                height={'100%'}
                className={informationCardStyle['information-container']}
            >
                {information?.Adresa != undefined &&
                    <Flex
                        flexDirection={'row'}
                        className={`${informationCardStyle['information-row']} link-interaction`}
                    >
                        <Flex
                            flexDirection={'column'}
                            width={'15%'}
                            className={informationCardStyle['information-column-icon']}
                        >
                            <FontAwesomeIcon icon={faLocationDot} />
                        </Flex>
                        <Flex
                            flexDirection={"column"}
                            width={'85%'}
                        >
                            <a
                                target={'_blank'}
                                href={locationLink}
                                rel="noopener noreferrer"
                                className="a-tag"
                            >
                                {information?.Adresa}
                            </a>
                        </Flex>
                    </Flex>
                }
                {information?.Phone != undefined &&
                    <Flex
                        flexDirection={'row'}
                        className={`${informationCardStyle['information-row']} link-interaction`}
                    >
                        <Flex
                            flexDirection={'column'}
                            width={'15%'}
                            className={informationCardStyle['information-column-icon']}
                        >
                            <FontAwesomeIcon icon={faPhone} />
                        </Flex>
                        <Flex
                            flexDirection={'column'}
                            width={'85%'}
                        >
                            <a
                                target={'_blank'}
                                href={"tel:" + information?.Phone}
                                rel="noopener noreferrer"
                                className="a-tag"
                            >
                                <span>{information?.Phone}</span>
                            </a>
                        </Flex>
                    </Flex>
                }
                {information?.Website != undefined &&
                    <Flex
                        flexDirection={'row'}
                        className={`${informationCardStyle['information-row']} link-interaction`}
                    >
                        <Flex
                            flexDirection={'column'}
                            width={'15%'}
                            className={informationCardStyle['information-column-icon']}
                        >
                            <FontAwesomeIcon icon={faGlobe} />
                        </Flex>
                        <Flex
                            flexDirection={'column'}
                            width={'85%'}
                        >
                            <a
                                target={'_blank'}
                                href={information?.Website}
                                rel="noopener noreferrer"
                                className="a-tag"
                            >
                                {information?.Website}
                            </a>
                        </Flex>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}