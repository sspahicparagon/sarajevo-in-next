import { Flex, Heading } from "@chakra-ui/react";
import { convertDateToString } from "../helpers/DateHelper";
import { EventHTMLSafe } from "../interfaces/EventOverride";
import EventCard from "./EventCard";

const EventWithDateContainer = (props: {eventKey: string} & {events: { [key: string]: EventHTMLSafe[] } } & {locale: string}) => {
    
    return (
        <Flex
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            maxW={'550px'}
        >
            <Flex
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                boxSizing={'border-box'}
                flexDirection={'column'}
                margin={'auto'}
                minW={{"base": '300px', "md":'550px'}}
                marginBottom={'2rem'}
            >
                <Heading
                    as={'h2'}
                    color={'white'}
                    fontSize={'24px'} 
                    lineHeight={'29px'} 
                    fontStyle={'normal'} 
                    fontWeight={'700'}
                    flexGrow={1}
                >
                    {convertDateToString(new Date(props.eventKey), props.locale)}
                </Heading>
            </Flex>
        { 
            props.events[props.eventKey]?.map(event => {
                return (
                    <EventCard event={event} key={event.EventID}/>
                )
                
            })
        }
    </Flex>
    )
};

export default EventWithDateContainer;