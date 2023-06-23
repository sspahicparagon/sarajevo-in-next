import { Box, Flex, FormLabel, Input, NumberInput, Select, Spinner, NumberInputField, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEvent, useRef, useState } from "react";
import { ImageUploadKeyValue } from "../../values/GlobalValues";
import style from '../../styles/Event.module.css';
import { Calendar as CalendarPicker } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import InformationService from "../../services/InformationService";
import { SSRConfig, useTranslation } from "next-i18next";
import { location, groupe } from "@prisma/client";
import { useRouter } from "next/router";
import { TranslationType } from "../../interfaces/TranslationType";

const Calendar: NextPage<SSRConfig & { locations: (location & { groupe: groupe | null })[] } > = (props) => {
    const [image, setImage] = useState<File>();
    const [date, setDate] = useState<Date>();
    const [loading, setLoading] = useState<boolean>(false);
    const [texts, setTexts] = useState<{[key: string]: string}>({ description_en: '', description_bs: '', description_de: '' });
    const nameRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const englishTextRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);

    const createFormData = (): FormData => {
        const formData = new FormData();
        formData.set(ImageUploadKeyValue, image!);
        formData.append('eventName', nameRef.current?.value ?? "");
        formData.append('time', timeRef.current?.value ?? "00:00");
        formData.append('location', locationRef.current?.value ?? "-1");
        formData.append('date', date?.toLocaleDateString() ?? new Date('0001/01/01').toLocaleDateString());
        formData.append('price', priceRef.current?.value ?? "-1");
        Object.keys(texts).forEach(key => {
            formData.append(key, texts[key]);
        })
        
        return formData;
    }

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value;
        setTexts({ ...texts, [event.target.name]: value });
    };

    return (
        <>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                className={style.container}
                marginTop={'var(--toolbar-container-height)'}
            >
                {loading &&
                    <Box
                        position={'absolute'}
                        top={'0'}
                        left={'0'}
                        width={'100%'}
                        height={'calc(100vh - var(--toolbar-container-height))'}
                        zIndex={5}
                        backgroundColor={'white'}
                        justifyContent={'center'}
                        alignItems={'center'}

                    >
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            margin={'auto'}
                            width={'100%'}
                            height={'100%'}
                        >
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='var(--color-gray)'
                                color='var(--base-color)'
                                size="xl" 
                            />
                        </Flex>
                    </Box>
                }
                <form action="/api/event" method="post" encType="multipart/form-data" onSubmit={async (event) => {
                    event.preventDefault();
                    const body = createFormData();

                    setLoading(true);

                    let res = await axios.postForm('/api/event', body);
                    if(res.status == 200) {
                        setLoading(false);
                        router.push('/admin-event');
                        return;
                    }
                }}>
                    <FormLabel>Upload image</FormLabel>
                    <Input type={'file'} accept={'image/*'} onChange={(event) => {
                        if(event.target.files && event.target.files[0])
                            setImage(event.target.files[0]);
                    }} />
                    <FormLabel>Date</FormLabel>
                    <CalendarPicker onChange={(value) => {
                        var date = new Date(value?.toLocaleString() ?? "")
                        setDate(date);
                    }}/>
                    <FormLabel>Name of event</FormLabel>
                    <Input type={'text'} ref={nameRef} />
                    <FormLabel>Description</FormLabel>
                        <FormLabel>English</FormLabel>
                        <Textarea name="description_en" maxLength={1024} resize={'vertical'} value={texts.description_en} onChange={handleTextAreaChange}/>
                        <FormLabel>Bosanski</FormLabel>
                        <Textarea name="description_bs" maxLength={1024} resize={'vertical'} value={texts.description_bs} onChange={handleTextAreaChange}/>
                        <FormLabel>Deutsch</FormLabel>
                        <Textarea name="description_de" maxLength={1024} resize={'vertical'} value={texts.description_de} onChange={handleTextAreaChange}/>
                    <FormLabel>Time of event</FormLabel>
                    <Input type={'time'} ref={timeRef} />
                    <FormLabel>Price</FormLabel>
                    <NumberInput precision={2}>
                        <NumberInputField ref={priceRef} />
                    </NumberInput>
                    <FormLabel>Location</FormLabel>
                    <Select ref={locationRef}>
                        {
                            props.locations?.map(location => {
                                return (
                                    <option key={location.LocationID} value={location.LocationID}>{`${location.Name} - ${location.groupe?.Name}`}</option>
                                )
                            })
                        }
                    </Select>
                    <Input type={'submit'} value={'Save'}/>
                </form>
            </Flex>
        </>
    )
};

// export async function getStaticPaths(context: any) {
//     // let result = await EventService.getEvents();
//     // const paths = getPagePaths(context, result, 'EventID');

//     const paths = [
//         {params: { id: '-1'}, locale: 'en'},
//         {params: { id: '-1'}, locale: 'bs'},
//         {params: { id: '-1'}, locale: 'de'}
//     ]
//     return {
//         paths: paths,
//         fallback: 'blocking'
//     }
// }

export async function getServerSideProps(context: any) {
    // let response: event | null = null;

    // if(context.params.id > 0)
    //     response = await EventService.getEvent(context.params.id);

    const locations = await InformationService.getLocations();

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
            locations: locations
        }
    };
}

export default Calendar;