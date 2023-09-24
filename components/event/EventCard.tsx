import { Flex, Box, Text, useDisclosure } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventFactory } from "../../factory/EventFactory";
import { CategoryIconsJson } from "../../values/GlobalValues";
import EventModal from "./EventModal";
import { EventHTMLSafe } from "../../interfaces/EventOverride";
import { useState } from "react";
import eventStyle from '../../styles/Event.module.css';
import Card from "../ImageCard";
import ChakraNextLink from "../ChakraNextLink";

const EventCard = (props: { event: EventHTMLSafe }) => {

    return (
        <Flex key={props.event?.EventID + 'Container'}>
            <ChakraNextLink href={`/event/${props.event?.EventID!}`}>
                <Box 
                    className={eventStyle.singleEventWrapper} 
                    key={props.event?.EventID + 'Card'}
                >
                    <div className={eventStyle.singleEvent}>
                        <Flex
                        height={{'base': '100px', "md": '150px'}}
                        width={{"base": '300px', "md":'550px'}}
                        className={eventStyle['single-event-card']}
                        >
                            <Flex
                                width={{"base": '95px', "md": '145px'}}
                                className={eventStyle['single-event-image-container']}
                            >
                                <Card image={EventFactory.getLesserQualityImage(props.event?.Image ?? "")} enableClick={false}/>
                            </Flex>
                            <Flex
                                width={{"base": '205px', "md": '405px'}}
                                flexDirection={'column'}
                                className={eventStyle['single-event-text-container']}
                            >
                                <Flex
                                    className={'center'}
                                >
                                    <Flex
                                        flexDirection={'column'}
                                        height={{'base':'45px', 'md':'70px'}}
                                        className={eventStyle['single-event-name-wrapper']}
                                    >
                                        <Text 
                                            as={'h2'} 
                                            fontSize={{'base': '16px', 'md': '20px'}}
                                            className={`${eventStyle['selectedEventText']} ${eventStyle['single-event-name-text']}`}
                                            lineHeight={{'base': '20px', 'md': '30px'}}
                                        >
                                            {props.event?.Name}
                                        </Text>
                                    </Flex>
                                    <Flex
                                        flexDirection={'column'}
                                        className={eventStyle['single-event-icon']}
                                    >
                                        <FontAwesomeIcon 
                                            size={'1x'} 
                                            icon={CategoryIconsJson[props.event?.location?.GroupeID ?? -1]}
                                            />
                                    </Flex>
                                </Flex>
                                <Flex
                                    height={{'base': '30px', 'md': '45px'}}
                                >
                                    <Text 
                                        as={'p'}
                                        fontSize={{'base': '14px', 'md': '16px'}}
                                        className={eventStyle['single-event-location-name']}
                                    >
                                        {props.event?.location?.Name}
                                    </Text>
                                </Flex>
                                <Flex
                                    height={{'base':'25px', 'md': '35px'}}
                                    className={eventStyle['single-event-time']}
                                >
                                    <Text as={'p'}>{props.event?.Time}</Text>
                                </Flex>
                                
                            </Flex>
                        </Flex>
                    </div>
                </Box>
            </ChakraNextLink>
        </Flex>
    );
};

export default EventCard;