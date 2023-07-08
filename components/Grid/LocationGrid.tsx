import { Heading } from "@chakra-ui/react";
import { LocationGridItem } from "../../interfaces/TemplateGridItem";

const LocationGrid = (props: Partial<LocationGridItem>) => {
  return (
    <>
      <Heading
          as={'h2'}
          fontSize={{ 'base': '1xl' }}
          textAlign={'center'}
      >
          {props.title}
      </Heading>
    </>
  )
}

export default LocationGrid;