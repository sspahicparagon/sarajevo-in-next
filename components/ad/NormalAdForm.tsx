import {
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Flex
} from "@chakra-ui/react";
import {Prisma} from "@prisma/client";
import {convertDateValueToDate} from "../../helpers/DateHelper";
import {CustomAdFull, CustomAdTypeFull} from "../../interfaces/CustomAd";
import ButtonSubmitForm from "../common/ButtonSubmitForm";
import useFormAd from "../../hooks/useFormAd";
import {Calendar as CalendarPicker} from 'react-calendar';
import Image from 'next/image';
import imageLoader from "../../lib/imageLoader";

export interface NormalAdFormProps {
  adTypes: CustomAdTypeFull[];
  action: string;
  method: string;
  sentValues?: CustomAdFull;
}

const NormalAdForm = (props : NormalAdFormProps) => {

  const {
    onSubmit,
    updateImage,
    updateFormValue,
    formValues,
    isLoading
  } = useFormAd({
    ...props
  });

  return (
    <>
      <form encType="multipart/form-data"
        action={
          `/api/ad/${
            props.action
          }`
        }
        method={
          props.method
        }
        onSubmit={onSubmit}>
        {
        formValues.Image && <Flex pos={'relative'}
          justify={'center'}>
          <Image src={
              formValues.Image
            }
            width={200}
            height={250}
            loader={imageLoader}/>
        </Flex>
      }
        <FormControl isRequired={
          formValues.Image == '' || formValues.Image == 'TEMPORARY'
        }>
          <FormLabel>Upload Image</FormLabel>
          <Input type={'file'}
            accept={'image/*'}
            onChange={
              (event) => {
                if (event.target.files && event.target.files[0]) {
                  updateImage(event.target.files[0]);
                }
              }
            }/>
        </FormControl>
      <FormControl isRequired>
        <FormLabel>Lasts Until</FormLabel>
        <CalendarPicker value={
            formValues ?. EndDate
          }
          onChange={
            (value, e) => {
              updateFormValue(Prisma.Custom_adScalarFieldEnum.EndDate, convertDateValueToDate(value))
            }
          }/>
      </FormControl>
    <FormControl isRequired>
      <FormLabel>Name</FormLabel>
      <Input type={'text'}
        onChange={
          (e) => updateFormValue(Prisma.Custom_adScalarFieldEnum.Name, e.currentTarget.value)
        }
        value={
          formValues ?. Name
        }/>
    </FormControl>
    <FormControl isRequired>
        <FormLabel>Url</FormLabel>
        <Input type={'url'}
          onChange={(e) => { updateFormValue(Prisma.Custom_adScalarFieldEnum.Url, e.currentTarget.value) }}
          value={ formValues?.Url! }
        />
    </FormControl>
    <FormControl isRequired
      isInvalid={
        formValues.CustomAdTypeID ! < 0
    }>
      <FormLabel>Format</FormLabel>
      <Select value={
          formValues ?. CustomAdTypeID
        }
        onChange={
          (e) => updateFormValue(Prisma.Custom_adScalarFieldEnum.CustomAdTypeID, e.currentTarget.value)
      }>
        {
        props.adTypes.map((adType) => {
          return (
            <option key={
                adType.CustomAdTypeID
              }
              value={
                adType.CustomAdTypeID
            }>
              {
              `Width:${
                adType.Width
              } x Height: ${
                adType.Height
              }`
            }</option>
          )
        })
      } </Select>
    </FormControl>
    <HStack>
      <ButtonSubmitForm isLoading={isLoading}/>
    </HStack>
  </form>
</>
  );
};

export default NormalAdForm;

