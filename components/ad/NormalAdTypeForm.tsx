import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input
} from "@chakra-ui/react";
import {ChangeEvent, useCallback, useState} from "react";
import ButtonSubmitForm from "../common/ButtonSubmitForm";
import {CustomAdTypeFull} from "../../interfaces/CustomAd";
import ButtonSubmitDeleteForm from "../common/ButtonSubmitDeleteForm";
import axios, {HttpStatusCode} from "axios";
import {useRouter} from "next/router";

export interface NormalAdTypeFormProps {
  action: string;
  method: string;
  sentValues: CustomAdTypeFull;
  onFinished: () => void;
}

const initialValues: CustomAdTypeFull = {
  Width: '',
  Height: ''
};

const NormalAdTypeForm = ({action, method, sentValues, onFinished} : NormalAdTypeFormProps) => {
  const [formValues, setFormValues] = useState < CustomAdTypeFull > (Object.keys(sentValues).length == 0 ? initialValues : sentValues);
  const router = useRouter();
  const handleChange = (key : string, value : string) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [key]: value
      }
    });
  };

  const onSubmit = useCallback(async (event : ChangeEvent < HTMLFormElement >) => {
    event ?. preventDefault();
    const formData = new FormData();
    formData.append('Height', formValues ?. Height ?? '');
    formData.append('Width', formValues ?. Width ?? '');
    formData.append('CustomAdTypeID', `${
      formValues ?. CustomAdTypeID
    }` ?? '');

    let res = await axios({
        url: `/api/ad/type/${
        action.toLowerCase()
      }`,
      data: formData,
      method: method
    });

    if (res.status == HttpStatusCode.Ok) {
      onFinished();
      return router.push('/admin-ad/type');
    }


  }, [formValues]);

  return (
    <form action={
        `/api/ad/${action}`
      }
      method={method}
      onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>Width:</FormLabel>
        <Input type={'text'}
          value={
            formValues ?. Width
          }
          onChange={
            (e) => handleChange("Width", e.currentTarget.value)
          }/>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Height:</FormLabel>
        <Input type={'text'}
          value={
            formValues ?. Height
          }
          onChange={
            (e) => handleChange("Height", e.currentTarget.value)
          }/>
      </FormControl>
      <HStack gap={2}
        mt={2}>
        <ButtonSubmitForm isLoading={false}/>
      </HStack>
    </form>
  )
};

export default NormalAdTypeForm;

