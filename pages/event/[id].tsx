import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import EventModal from "../../components/EventModal";
import { EventHTMLSafe } from "../../interfaces/EventOverride";
import { Flex, useDisclosure } from "@chakra-ui/react";
import EventService from "../../services/EventService";
import { EventFactory } from "../../factory/EventFactory";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { TranslationService } from "../../services/TranslationService";
import imageLoader from "../../lib/imageLoader";

const EventModalPage: NextPage<{selectedEvent: EventHTMLSafe}> = (props) => {
  const router = useRouter();
  const description = TranslationService.getEventTranslation(props.selectedEvent?.event_translation ?? [], 'description', router.locale ?? 'en');
  // useEffect(() => {
  //   router.prefetch('/event');
  // }, [])
  console.log({route: process.env.BASE_URL});
  return (
    <>
      <Head>
        <meta property="og:title" content={props.selectedEvent.Name ?? ""} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={EventFactory.getFullQualityImage(props.selectedEvent?.Image ?? "")} />
        <meta property="og:image:alt" content={props.selectedEvent.Name ?? ""} />
        <meta property="og:locale" content={router.locale} />
        <meta property="description" content={description} />
        <title>Event - {props.selectedEvent.Name}</title>  
        <link rel="canonical" href={process.env.BASE_URL + router.asPath} />
      </Head>
      <Flex width={'100vw'} height={'100vh'} backgroundColor={'var(--base-color)'} />
      <EventModal selectedEvent={props.selectedEvent} />
    </>
  )
}

export default EventModalPage;

export async function getServerSideProps(context: any) {

  const event = await EventService.getEvent(context.params.id);
  const safeEvent = EventFactory.prepareEventForHTML(event ?? {});

  return {
      props: {
          ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
          selectedEvent: safeEvent,
      }
  };
}