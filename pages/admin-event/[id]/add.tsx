import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import style from '../../../styles/Event.module.css';
import { SSRConfig } from "next-i18next";
import { LocationService } from "../../../services/LocationService";
import { LocationFull } from "../../../interfaces/LocationOverride";
import EventForm from "../../../components/event/EventForm";

const Add: NextPage<SSRConfig & { locations: LocationFull[] }> = (props) => {
    return (
        <>
          <Flex
              justifyContent={'center'}
              alignItems={'center'}
              className={style.container}
              marginTop={'var(--toolbar-container-height)'}
          >
            <EventForm ns={props._nextI18Next?.ns} locations={props.locations} action={'add'} method={'POST'} />
          </Flex>
        </>
    )
};

export async function getServerSideProps(context: any) {
    const locations = await LocationService.getAllLocations();
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer', 'admin'])),
            locations: locations
        }
    };
}

export default Add;