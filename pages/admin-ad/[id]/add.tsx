import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select
} from "@chakra-ui/react";
import {GetServerSidePropsContext, NextPage} from "next";
import {ChangeEvent, useCallback, useState} from "react";
import {CustomAdFull, CustomAdTypeFull} from "../../../interfaces/CustomAd";
import {Prisma} from "@prisma/client";
import {addMonthsToDate, convertDateValueToDate, convertDateValueToString} from "../../../helpers/DateHelper";
import {Calendar as CalendarPicker} from 'react-calendar';
import {SSRConfig} from "next-i18next";
import {AdService} from "../../../services/AdService";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import ButtonSubmitForm from "../../../components/common/ButtonSubmitForm";
import {ImageUploadKeyValue} from "../../../values/GlobalValues";
import axios, {HttpStatusCode} from "axios";
import {useRouter} from "next/router";
import useFormAd from "../../../hooks/useFormAd";
import NormalAdForm from "../../../components/ad/NormalAdForm";

const AdminAdAddPage: NextPage < SSRConfig & {
  adTypes: CustomAdTypeFull[]
} > = (props) => {

  return (
    <>
      <Flex justify={'center'}
        align={'center'}
        mt={'var(--toolbar-container-height)'}>
        <NormalAdForm action="add" method="POST"
          adTypes={
            props.adTypes
          }/>
      </Flex>
    </>
  );
};
export async function getServerSideProps({
  locale = 'en'
} : GetServerSidePropsContext) {
  const adTypes = await AdService.getAllAdTypes();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      adTypes
    }
  }
}
export default AdminAdAddPage;

