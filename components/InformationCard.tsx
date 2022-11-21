import { PhoneIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ElementInformation from "../interfaces/ElementInformation";
import { faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import informationCardStyle from '../styles/InformationCard.module.css';


interface InformationCardConfing {
    title?: string;
    information?: ElementInformation;
}

export default function InformationCard({ title, information }: InformationCardConfing) {

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
                        className={informationCardStyle['information-row']}
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
                            <span>{information?.Adresa}</span>
                        </Flex>
                    </Flex>
                }
                {information?.Phone != undefined &&
                    <Flex
                        flexDirection={'row'}
                        className={informationCardStyle['information-row']}
                    >
                        <Flex
                            flexDirection={'column'}
                            width={'15%'}
                            className={informationCardStyle['information-column-icon']}
                        >
                            <PhoneIcon />
                        </Flex>
                        <Flex
                            flexDirection={'column'}
                            width={'85%'}
                        >
                            <a href={"tel:" + information?.Phone}><span>{information?.Phone}</span></a>
                        </Flex>
                    </Flex>
                }
                {information?.Website != undefined &&
                    <Flex
                        flexDirection={'row'}
                        className={informationCardStyle['information-row']}
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
                            <a href={information?.Website}>{information?.Website}</a>
                        </Flex>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}