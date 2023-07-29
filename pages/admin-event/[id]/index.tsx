import { Box, Flex, FormLabel, Input, NumberInput, Select, Spinner, NumberInputField, Textarea, FormControl, Image, FormHelperText } from "@chakra-ui/react";
import axios, { HttpStatusCode } from "axios";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { ImageUploadKeyValue } from "../../../values/GlobalValues";
import style from '../../../styles/Event.module.css';
import { Calendar as CalendarPicker } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import InformationService from "../../../services/InformationService";
import { SSRConfig, useTranslation } from "next-i18next";
import { location, groupe } from "@prisma/client";
import { useRouter } from "next/router";
import { TranslationType } from "../../../interfaces/TranslationType";
import { RRule, RRuleSet, rrulestr } from "rrule";
import { convertDateValueToDate, convertDateValueToString } from "../../../helpers/DateHelper";
import EventService from "../../../services/EventService";
import imageLoader from "../../../lib/imageLoader";
import { LocationService } from "../../../services/LocationService";

var initialValues: { [key: string]: any } = {
    eventName: '',
    time: '00:00',
    location: '-1',
    date: new Date().toLocaleDateString(),
    price: '-1',
    repeatFrequency: '-1',
    description_de: '',
    description_bs: '',
    description_en: '',
    uploadedImage: null,
    eventID: '-1',
    action: 'add',
    method: 'POST',
    rruleSet: null
}

const Calendar: NextPage<SSRConfig & { locations: (location & { groupe: groupe | null })[] } & { values: typeof initialValues | null } & { queryValues: typeof initialValues } > = (props) => {
    initialValues = { ...initialValues, ...props.queryValues };
    const [ values, setValues ] = useState(props.values ?? initialValues);
    const [image, setImage] = useState<File>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);
    const createFormData = (): FormData => {
        const formData = new FormData();
        formData.set(ImageUploadKeyValue, image!);
        Object.keys(initialValues).map((key) => {
            formData.append(key, values[key]);
        });
        return formData;
    }

    const handleValueChange = (name: string, value: string | File) => {
        setValues({ ...values, [name]: value });
    }

    const handleDelete = async () => {
        let result = await axios({
            url: '/api/event/delete',
            data: { eventID: values.eventID },
            method: 'DELETE'
        });

        if(result.status == HttpStatusCode.Ok) return router.push('/admin-event');
        //else Display toast message that something went wrong
    }

    const repeateFrequency: {[key: string]: number} = {
        "No repeat": -1,
        'Daily': RRule.DAILY,
        'Monthly': RRule.MONTHLY,
        'Weekly': RRule.WEEKLY,
        'Yearly': RRule.YEARLY
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
                <form action={`/api/event/${values.action}`} method={values.method} encType="multipart/form-data" onSubmit={async (event) => {
                    event.preventDefault();
                    const body = createFormData();
                    
                    setLoading(true);

                    let res = await axios({
                        url: `/api/event/${values.action}`,
                        data: body,
                        method: values.method
                    });
                    if(res.status == 200) {
                        setLoading(false);
                        router.push('/admin-event');
                        return;
                    }
                }}>
                    {image != undefined || values.uploadedImage != null && 
                        <Image width={'300px'} height={'400px'} src={imageLoader({src: values.uploadedImage})} />
                    }
                    <FormControl isRequired={!values.uploadedImage}>
                        <FormLabel>{props.values?.uploadedImage ? 'Upload new image' : 'Upload image'}</FormLabel>
                        <Input type={'file'} accept={'image/*'} onChange={(event) => {
                            if(event.target.files && event.target.files[0]) {
                                setImage(event.target.files[0]);
                            }
                        }} />
                        {values.uploadedImage != null &&
                            <FormHelperText color={'var(--base-color)'} fontWeight={'extrabold'}>Image already uploaded. Upload another one if you wish to change it.</FormHelperText>
                        }
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Date</FormLabel>
                        <CalendarPicker 
                            onChange={(value, e) => {
                                if(props.queryValues.date != new Date().toLocaleDateString()) return;

                                if(values.rruleSet != initialValues.rruleSet && values.repeatFrequency != initialValues.repeatFrequency) {
                                    let rruleSet = rrulestr(values.rruleSet);
                                    rruleSet.origOptions.dtstart = convertDateValueToDate(value);
                                    handleValueChange('rruleSet', rruleSet.toString());
                                }
                                handleValueChange('date', convertDateValueToString(value));
                            }} 
                            value={values.date} 
                        />
                        {props.queryValues.date != new Date().toLocaleDateString() &&
                            <FormHelperText color={'var(--base-color)'} fontWeight={'extrabold'}>Editing recurrance. Date can not be changed.</FormHelperText>
                        }
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Location</FormLabel>
                        <Select 
                            value={values.location} 
                            name="location" 
                            onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)}
                            isDisabled={props.queryValues.location != '-1'}
                        >
                            {
                                props.locations?.map(location => {
                                    return (
                                        <option key={location.LocationID} value={location.LocationID}>{`${location.Name} - ${location.groupe?.Name}`}</option>
                                    )
                                })
                            }
                        </Select>
                        {props.queryValues.location != '-1'&&
                            <FormHelperText color={'var(--base-color)'} fontWeight={'extrabold'}>Editing recurrance. Location can not be changed.</FormHelperText>
                        }
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Name of event</FormLabel>
                        <Input type={'text'} value={values.eventName} name="eventName" onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description English</FormLabel>
                        <Textarea name="description_en" maxLength={1024} resize={'vertical'} value={values.description_en} onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description Bosanski</FormLabel>
                        <Textarea name="description_bs" maxLength={1024} resize={'vertical'} value={values.description_bs} onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description Deutsch</FormLabel>
                        <Textarea name="description_de" maxLength={1024} resize={'vertical'} value={values.description_de} onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Time of event</FormLabel>
                        <Input name="time" type={'time'} value={values.time} onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Price</FormLabel>
                        <NumberInput precision={2} value={values.price}>
                            <NumberInputField name="price" onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)}/>
                        </NumberInput>
                    </FormControl>
                    {props.queryValues.date == new Date().toLocaleDateString() && 
                        <FormControl isRequired>
                            <FormLabel>Repeate frequency</FormLabel>
                            <Select value={values.repeatFrequency} name="repeatFrequency" onChange={(e) => handleValueChange(e.currentTarget.name, e.currentTarget.value)}>
                                {
                                    Object.keys(repeateFrequency).map((key) => {
                                        return (
                                            <option key={key} value={repeateFrequency[key]}>{t(key)}</option>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    }
                    <Input type={'submit'} value={'Save'}/>
                    {values.action == 'update' &&
                        <Input type={'button'} value={'Delete'} onClick={handleDelete}/>
                    }
                </form>
            </Flex>
        </>
    )
};

export async function getServerSideProps(context: any) {
    let values: typeof initialValues | null = null;
    if(context.params.id != '-1') {
        const event = await EventService.getEvent(context.params.id);

        if(event != null && event) {
            let rruleSet: RRuleSet | undefined;
            if(event.recurring_rule != null)
                rruleSet = rrulestr(event.recurring_rule, { 'forceset': true }) as RRuleSet;
            values = {
                eventName: event?.Name!!,
                time: event?.Time!!,
                location: `${event?.location?.LocationID!!}`,
                date: event?.Date?.toLocaleDateString()!!,
                price: `${event?.Price}`,
                repeatFrequency: rruleSet ? `${rruleSet?._rrule[0].options?.freq}` : '-1',
                uploadedImage: event.Image,
                eventID: `${event.EventID}`,
                action: 'update',
                method: 'PUT',
                rruleSet: rruleSet?.toString()
            };
            event.event_translation?.map((translation) => values![`${translation.Key}_${translation.Language}`] = translation.Translation);
        }
    }
    const locations = await LocationService.getAllLocations();
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer', 'admin'])),
            locations: locations,
            values,
            queryValues: {
                date: context.query.date != undefined ? new Date(context.query.date) : new Date().toLocaleDateString(), 
                location: context.query.locationID ?? "-1"
            }
        }
    };
}

export default Calendar;