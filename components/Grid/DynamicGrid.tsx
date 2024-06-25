import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { TemplateGridItem } from "../../interfaces/TemplateGridItem";
import gridStyle from '../../styles/Grid.module.css';
import { useRouter } from "next/router";
import Card from "../ImageCard";
import Link from "next/link";
import NormalAd from "../ad/NormalAd";
import { CustomAdFull } from "../../interfaces/CustomAd";
import useAdManager from "../../hooks/useAdManager";

interface GridProps {
  array: TemplateGridItem[];
  child: React.JSX.Element;
  linkEndpoint: string;
  handleScrollPosClick?: () => void;
  groupedAds: {[key: string]: CustomAdFull[]};
}

const DynamicGrid = (props: GridProps) => {
  const { locale } = useRouter();
  const { getAd } = useAdManager(props.groupedAds);
  
  return (
    <Grid 
      className={`center ${gridStyle['grid-container']}`}
    >
      {
        props.array.map((item, index) => {
          let condition = index % 5 == 0 && index > 0;
          let ad = undefined;
          if(condition)
              ad = getAd(300, 325);
          return (
            <>
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
                <NormalAd key={'Nesto random'} customAd={ad} condition={condition}/>
            </>
          )
        })
      }
    </Grid>
  )
}

export default DynamicGrid;