import { Flex } from "@chakra-ui/react";
import CalendarPicker from 'react-calendar';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const EventCalendar = (props: {locale: string} & {markDates: string[]} & {onChange: (date: Date, dateString: string) => void}) => {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

    const rightArrow = () => {
        return (
            <FontAwesomeIcon 
                size="lg" 
                icon={faArrowRight} 
            />
        )
    }

    const leftArrow = () => {
        return (
            <FontAwesomeIcon
            size={'lg'}
            icon={faArrowLeft} />
        )
    }
    return (
        <Flex
            paddingBlock={'1rem'}
        >
            <CalendarPicker 
                maxDetail={'month'} 
                minDetail={'month'} 
                minDate={firstDay} 
                maxDate={lastDay} 
                locale={props.locale} 
                nextLabel={rightArrow()}
                next2Label={null}
                prev2Label={null}
                prevLabel={leftArrow()}
                tileClassName={({date}) => {
                    if(props.markDates.find(x => x === date.toLocaleDateString('en'))) {
                        return 'react-calendar__tile--mark';
                    }
                }}
                formatDay={(locale, date) => {
                    return date.toLocaleDateString('en', { day: 'numeric' })
                }}
                formatMonthYear={(locale, date) => {
                    return date.toLocaleDateString(locale, {month: 'long'})
                }}
                onClickDay={(date: Date, event) => {
                    props.onChange(date, date.toLocaleDateString('en'));
                }}
            />
        </Flex>
    )
};

export default EventCalendar;