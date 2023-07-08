import { Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { TemplateGridItem } from "../../interfaces/TemplateGridItem";
import gridStyle from '../../styles/Grid.module.css';
import { useRouter } from "next/router";
import Card from "../ImageCard";
import Link from "next/link";

interface GridProps {
  array: TemplateGridItem[];
  child: React.JSX.Element;
  linkEndpoint: string;
  handleScrollPosClick?: () => void;
}

const DynamicGrid = (props: GridProps) => {
  const { locale } = useRouter();
  return (
    <Grid 
      className={`center ${gridStyle['grid-container']}`}
    >
      {
        props.array.map(item => {
          return (
            <Link 
              href={`/${props.linkEndpoint}/${item.id}`}
              locale={locale}
              key={Math.random()}
            >
            <Grid
              height={'400px'}
              className={gridStyle['card-container']}
              onClick={props.handleScrollPosClick}
            >
              <Flex
                height={'325px'}
                width={'100%'}
                flexDirection={'column'}
                position={'relative'}
              >
                <Card image={item.image} enableClick={false} alt={item.title ?? ""} />
              </Flex>
              <Flex
                width={'100%'}
                height={'75px'}
                flexDirection={'column'}
                className={`center ${gridStyle['card-text-container']}`}
              >
                <props.child.type title={item.title} />
              </Flex>
            </Grid>
            </Link>
          )
        })
      }
    </Grid>
  )
}

export default DynamicGrid;