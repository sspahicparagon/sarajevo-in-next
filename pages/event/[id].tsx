import { NextPage } from "next";
import { useRouter } from "next/router";
import EventModal from "../../components/event/EventModal";
import { EventHTMLSafe } from "../../interfaces/EventOverride";
import { Flex } from "@chakra-ui/react";
import EventService from "../../services/EventService";
import { EventFactory } from "../../factory/EventFactory";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TranslationService } from "../../services/TranslationService";
import SEO from "../../components/SEO";

const EventModalPage: NextPage<{selectedEvent: EventHTMLSafe} & { description: string }> = (props) => {
  const router = useRouter();

  return (
    <>
      <SEO
        title={`${props.selectedEvent.Name} - ${props.selectedEvent.location?.Name}`}
        description={props.description}
        imageUrl={EventFactory.getFullQualityImage(props.selectedEvent?.Image ?? "")}
        canonicalRelativeRoute={`/event/${props.selectedEvent.EventID}`}
      />
      <Flex width={'100vw'} height={'100vh'} backgroundColor={'var(--base-color)'} />
      <EventModal selectedEvent={props.selectedEvent} />
    </>
  )
}

export default EventModalPage;

export async function getServerSideProps(context: any) {
  const event = await EventService.getEvent(context.params.id);
  const safeEvent = EventFactory.prepareEventForHTML(event ?? {});
  const description = TranslationService.getEventTranslation(safeEvent.event_translation ?? [], 'description', context.locale ?? 'en');

  return {
      props: {
          ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
          selectedEvent: safeEvent,
          description
      }
  };
}