import { Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, Textarea, Image, HStack } from "@chakra-ui/react";
import { convertDateValueToString } from "../../helpers/DateHelper";
import { Calendar as CalendarPicker } from 'react-calendar';
import useFormEvent, { FormEvent } from "../../hooks/useFormEvent";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { TranslationType } from "../../interfaces/TranslationType";
import { LocationFull } from "../../interfaces/LocationOverride";
import 'react-calendar/dist/Calendar.css';
import imageLoader from "../../lib/imageLoader";

interface EventFormProps {
  ns: TranslationType,
  locations: LocationFull[],
  action: string,
  method: string,
  sentFormValues?: FormEvent
}

const EventForm = ({ ns, locations, action, method, sentFormValues = {} as FormEvent }: EventFormProps) => {
  const router = useRouter();
  const { t } = useTranslation<TranslationType>(ns);
  const { 
      formValues,
      updateFormValueThroughChangeEvent, 
      updateFormValue,
      onSubmit, 
      isLoading,
      repeatFrequency,
      repeatFrequencyKeys,
      updateImage,
      updateRRuleSet ,
      handleDelete
  } = useFormEvent(sentFormValues, action, method, router);

  return (
    <form action={`/api/event/${action}`} method={method} encType="multipart/form-data" onSubmit={onSubmit}>
      { (formValues.uploadedImage && formValues.uploadedImage != '') &&
          <Image width={'300px'} height={'400px'} src={imageLoader({src: formValues.uploadedImage})} />
      }
      <FormControl isRequired={formValues.uploadedImage == ''} isDisabled={isLoading}>
          <FormLabel>Upload image</FormLabel>
          <Input type={'file'} accept={'image/*'} onChange={(event) => {
              if(event.target.files && event.target.files[0]) {
                  updateImage(event.target.files[0]);
              }
          }} />
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Date</FormLabel>
          <CalendarPicker 
            onChange={(value, e) => {
              if(isLoading) return;
              updateRRuleSet(value);
              updateFormValue('date', convertDateValueToString(value));
            }} 
            value={formValues.date} 
          />
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Location</FormLabel>
          <Select 
              value={formValues.location} 
              name="location" 
              onChange={updateFormValueThroughChangeEvent}
          >
              {
                  locations?.map(location => {
                      return (
                          <option key={location.LocationID} value={location.LocationID}>{`${location.Name} - ${location.groupe?.Name}`}</option>
                      )
                  })
              }
          </Select>
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Name of event</FormLabel>
          <Input 
            type={'text'} 
            value={formValues.eventName} 
            name="eventName" 
            onChange={updateFormValueThroughChangeEvent}
          />
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Description English</FormLabel>
          <Textarea 
            name="description_en" 
            maxLength={1024} 
            resize={'vertical'} 
            value={formValues.description_en} 
            onChange={updateFormValueThroughChangeEvent}
          />
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Description Bosanski</FormLabel>
          <Textarea 
            name="description_bs" 
            maxLength={1024} 
            resize={'vertical'} 
            value={formValues.description_bs} 
            onChange={updateFormValueThroughChangeEvent}
          />
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Description Deutsch</FormLabel>
          <Textarea 
            name="description_de" 
            maxLength={1024} 
            resize={'vertical'} 
            value={formValues.description_de} 
            onChange={updateFormValueThroughChangeEvent}
          />
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Time of event</FormLabel>
          <Input 
            name="time" 
            type={'time'} 
            value={formValues.time} 
            onChange={updateFormValueThroughChangeEvent}
          />
      </FormControl>
      <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Price</FormLabel>
          <NumberInput precision={2} value={formValues.price}>
              <NumberInputField name="price" onChange={updateFormValueThroughChangeEvent}/>
          </NumberInput>
      </FormControl>
        <FormControl isRequired isDisabled={isLoading}>
            <FormLabel>Repeate frequency</FormLabel>
            <Select value={formValues.repeatFrequency} name="repeatFrequency" onChange={updateFormValueThroughChangeEvent}>
                {
                    repeatFrequencyKeys.map((key) => {
                        return (
                            <option key={key} value={repeatFrequency[key]}>{t(key)}</option>
                        )
                    })
                }
            </Select>
        </FormControl>
      <HStack
        gap={5}
        mt={5}
      >
        <Button 
          type={'submit'} 
          isLoading={isLoading}
          size={'lg'}
          variant={'outline'}
          bg={'var(--color-gray)'}
          color={'var(--base-color)'}
          _hover={{ 'color': 'var(--base-color)', 'bg': 'var(--color-gray)' }}
          width={'100%'}
          loadingText={'Saving'}
          margin={'auto'}
        >
          Save
        </Button>
        { method == 'PUT' &&
            <Button
            type={'button'}
            isLoading={isLoading}
            size={'lg'}
            colorScheme="red"
            onClick={handleDelete}
            w={'100%'}
          >
            Delete
          </Button>
        }
      </HStack>
  </form>
  )
};

export default EventForm;