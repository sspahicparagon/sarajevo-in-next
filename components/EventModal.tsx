import { Box, CloseButton, Flex, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventFactory } from "../factory/EventFactory";
import { EventHTMLSafe } from "../interfaces/EventOverride";
import { CategoryIconsJson } from "../values/GlobalValues";
import Card from "./ImageCard";
import eventStyle from '../styles/Event.module.css';
import { useRouter } from "next/router";
import ChakraNextLink from "./ChakraNextLink";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const EventModal = (props: { selectedEvent: EventHTMLSafe | undefined }) => {
    const { locale, push } = useRouter();
    const eventText: string = props.selectedEvent?.event_translation?.find(translation => translation.Key == 'description' && translation.Language == locale)?.Translation ?? '';


    return (
        <Modal 
            isOpen={true} 
            onClose={async () => await push('/event')}
            size={{'base': 'xs', 'md': 'lg', 'xl': 'xl'}}
            key={props.selectedEvent?.EventID + 'Modal'}
            motionPreset='slideInBottom'
            scrollBehavior="inside"
            isCentered
        >
            <ModalOverlay
                className={eventStyle['modal-overlay']}
            />
            <ModalContent
                className={eventStyle['modal-content']}
                height={{'base': '455px', 'md': '475px'}}
                marginTop={{'base': '300px', 'md': '350px', 'xl': '100px !important'}}
                paddingBlock={{'base': '0', 'xl': '20px'}}
                paddingInline={{'base': '0', 'xl': '100px'}}
            >
                <CloseButton 
                    size='lg' 
                    onClick={async () => await push('/event')}
                    top={{'base':'-100px', 'md': '-133px', 'xl': '402px'}}
                    left={{'base': '5px', 'xl': '-110px'}}
                    className={eventStyle['modal-close-button']}
                />
                <Box
                    className={eventStyle['modal-image-container']}
                    width={{'base': '175px', 'md': '225px', 'xl': '300px'}}
                    height={{'base': '175px', 'md': '225px', 'xl': '300px'}}
                    top={{'base': '-200px', 'md': '-257px', 'xl': '85px'}}
                    left={{'base': '144px', 'md': '287px', 'xl': '-240px'}}
                >
                    <Card image={EventFactory.getFullQualityImage(props.selectedEvent?.Image ?? "")} enableClick={false}/>
                </Box>
                <Box
                    width={{'base': '100px', 'md': '190px', 'xl': '60px'}}
                    height={{'base':'60px', 'xl': '200px'}}
                    left={{'base':'80px', 'md': '140px', 'xl': '577px'}}
                    top={{'base':'-60px', 'md': '-60px', 'xl': '185px'}}
                    borderRadius={{'base': '10px 10px 0 0', 'xl': '0 10px 10px 0'}}
                    className={eventStyle['modal-decoration-box']}
                />
                <ModalHeader
                    color={'var(--color-gray)'}
                >
                    <Heading
                        as={'h2'}
                        fontSize={'18px'}
                        height={'44px'}
                        className={`${eventStyle['selectedEventText']} ${eventStyle['modal-heading']}`}
                    >
                        {props.selectedEvent?.Name}
                    </Heading>
                <Stack 
                    direction="row" 
                    className={eventStyle['modal-information-stack']}
                >
                    <Text
                        position={{'base':'absolute', 'xl': 'static'}}
                        top={{'base':'-210px', 'md': '-270px', 'xl': '0'}}
                        display={{'base': 'block', 'xl': 'inline-flex'}}
                        fontSize={{'base': '24px', 'md': '32px'}}
                        left={{'base':'5px', 'xl': '0'}}
                        className={eventStyle['modal-information-time-left']}
                    >{props.selectedEvent?.Time?.split(':')[0]}</Text>
                    <Text
                        position={{'base':'absolute', 'xl': 'static'}}
                        display={{'base': 'block', 'xl': 'inline-flex'}}
                        top={{'base':'-210px', 'md': '-270px', 'xl': '0'}}
                        fontSize={{'base': '24px', 'md': '32px'}}
                        left={{'base': '35px', 'md': '44px', 'xl': '0'}}
                        className={eventStyle['modal-information-time-right']}
                    >{props.selectedEvent?.Time?.split(':')[1]}</Text>
                    <Text
                        position={{'base':'absolute', 'xl': 'static'}}
                        top={{'base':'-180px', 'md': '-230px', 'xl': '0'}}
                        left={{'base':'5px', 'xl': '0'}}
                        fontSize={{'base': '16px', 'md': '22px' }}
                        display={{'base': 'block', 'xl': 'inline-flex'}}
                        className={eventStyle['modal-information-price']}
                    >{props.selectedEvent?.Price! > 0 ? props.selectedEvent?.Price! + " KM" : 'Free'}</Text>
                </Stack>
                <Stack
                        direction={'row'}
                        alignItems={'center'}
                    >
                        <Flex
                            className={eventStyle['modal-header-icon']}
                            justifyContent={'start'}
                        >
                            <FontAwesomeIcon size={'1x'} icon={faLocationDot} color={'var(--color-gray)'} />
                        </Flex>
                            <Heading
                                as={'h2'}
                                className={eventStyle['modal-header-location-name']}
                            >
                                <ChakraNextLink href={`/details/${props.selectedEvent?.LocationID}`} locale={locale}>
                                    {props.selectedEvent?.location?.Name}
                                </ChakraNextLink>
                            </Heading>
                        <Flex
                            className={eventStyle['modal-header-icon']}
                        >
                            <FontAwesomeIcon size={'1x'} icon={CategoryIconsJson[props.selectedEvent?.location?.GroupeID ?? -1]} color={'var(--color-gray)'}/>
                        </Flex>
                </Stack>
                </ModalHeader>
                <ModalBody>
                    <Text className={eventStyle['modal-body-text']}>
                        {eventText}
                    </Text>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
};

export default EventModal;
