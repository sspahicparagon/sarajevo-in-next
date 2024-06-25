import {Flex} from "@chakra-ui/react";
import {GetServerSidePropsContext, NextPage} from "next";
import NormalAdForm from "../../../components/ad/NormalAdForm";
import {SSRConfig} from "next-i18next";
import {CustomAdFull, CustomAdTypeFull} from "../../../interfaces/CustomAd";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {AdService} from "../../../services/AdService";

const AdminAdEditPage: NextPage < SSRConfig & {
  adTypes: CustomAdTypeFull[],
  existingCustomAd: CustomAdFull
} > = (props) => {
  return (
    <>
      <Flex justify={'center'}
        align={'center'}
        mt={'var(--toolbar-container-height)'}>
        <NormalAdForm action="update" method="PUT"
          adTypes={
            props.adTypes
          }
          sentValues={
            props.existingCustomAd
          }/>
      </Flex>
    </>
  );
};

export async function getServerSideProps({
  locale = 'en',
  params = {
    id: '-1'
  }
} : GetServerSidePropsContext < {
  id : string
} >) {
  const adTypes = await AdService.getAllAdTypes();
  const customAdID: number = parseInt(params.id);

  const existingCustomAd = await AdService.getAd(customAdID);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      adTypes,
      existingCustomAd
    },
    notFound: customAdID < 0
  }
}

export default AdminAdEditPage;

