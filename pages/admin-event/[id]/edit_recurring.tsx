import { NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { LocationFull } from "../../../interfaces/LocationOverride";
import { Flex } from "@chakra-ui/react";
import EventForm from "../../../components/event/EventForm";
import style from '../../../styles/Event.module.css';
import { LocationService } from "../../../services/LocationService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent } from "../../../hooks/useFormEvent";

const EditRecurring: NextPage<SSRConfig & { locations: LocationFull[] } & { sentFormValues: FormEvent }> = (props) => {
  return (
    <>
      <Flex
          justifyContent={'center'}
          alignItems={'center'}
          className={style.container}
          marginTop={'var(--toolbar-container-height)'}
      >
        <EventForm ns={props._nextI18Next?.ns} locations={props.locations} action={'add'} method={'POST'} sentFormValues={props.sentFormValues} />
      </Flex>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const eventID: string = context.params.id;
  const { date, locationID } = context.query;

  const sentValues = { location: locationID, date: date } as FormEvent;

  const locations = await LocationService.getAllLocations();
  return {
      props: {
          ...(await serverSideTranslations(context.locale, ['common', 'footer', 'admin'])),
          locations: locations,
          sentFormValues: sentValues
      }
  };
}

export default EditRecurring;