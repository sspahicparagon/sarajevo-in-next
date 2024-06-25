import {GetStaticPropsContext, NextPage} from "next";
import {AdService} from "../../services/AdService";
import {CustomAdFactory} from "../../factory/CustomAdFactory";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {SSRConfig} from "next-i18next";
import {CustomAdFull} from "../../interfaces/CustomAd";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  OrderedList,
  Text,
  useDisclosure,
  useStatStyles
} from "@chakra-ui/react";
import Image from "next/image";
import imageLoader from "../../lib/imageLoader";
import {convertDateToString2DigitsShortMonth, convertDateToString2DigitsShortMonthYear} from "../../helpers/DateHelper";
import {useRouter} from "next/router";
import {ChangeEvent, MouseEventHandler, useState} from "react";
import DraggableList from "../../components/common/DraggableList";
import NormalAdEditOrderDrawer from "../../components/ad/NormalAdEditOrderDrawer";
import axios, {HttpStatusCode} from "axios";

const AdminAdIndexPage: NextPage < SSRConfig & {
  ads: {
  [key: string]: CustomAdFull[]
  }
} > = (props) => {
  const {locale, push} = useRouter();
  const [keys, setKeys] = useState < string[] > (Object.keys(props.ads));
  const [shouldOrder, setShouldOrder] = useState < CustomAdFull[] > ([]);
  const {onClose, onOpen, isOpen} = useDisclosure();
  const selectKey = (key : string) => {
    if (key == 'reset') {
      setKeys(Object.keys(props.ads));
      return;
    }
    setKeys([key]);
  }

  const onOrder = (key : string) => {
    setShouldOrder(props.ads[key].sort((x, y) => x.Order ! > y.Order ! ? 1 : x.Order ! == y.Order ! ? 0 : -1));
    onOpen();
  }

  const onDelete = async (adID : number) => {
    let res = await axios({
      url: `/api/ad/delete`,
      method: 'DELETE',
      data: {
        id: adID
      }
    });

    if (res.status == HttpStatusCode.Ok) 
      return push('/admin-ad');
    


  }

  return (
    <>
      <NormalAdEditOrderDrawer isOpen={isOpen}
        onClose={onClose}
        ads={shouldOrder}/>
      <Flex justify={'center'}
        align={'center'}
        direction={'column'}
        bg={'var(--color-gray)'}>
        <Button mb={2}
          mt={2}
          onClick={
            (e) => {
              return push('/admin-ad/-1/add');
            }
        }>Create new Ad</Button>
        <Flex direction={'column'}>
          <Heading>Filter</Heading>
          <Flex gap={4}
            flexWrap={'wrap'}
            justify={'center'}>
            {
            Object.keys(props.ads).map((key) => {
              return (
                <Button onClick={
                    (e) => selectKey(key)
                  }
                  colorScheme={'linkedin'}
                  key={
                    `Bar-${key}`
                }>
                  {key}</Button>
              )
            })
          }
            {
            (keys.length == 1 && Object.keys(props.ads).length != 1) && <Button colorScheme={'green'}
              onClick={
                (e) => selectKey('reset')
            }>Clear</Button>
          } </Flex>
        </Flex>
        {
        keys.map((key) => {
          let ads = props.ads[key];

          return (
            <Flex direction={'column'}
              key={key}
              width={'100%'}
              marginInline={'auto'}>
              <Flex>
                <Heading>Format: {key}</Heading>
                <Button name={key}
                  colorScheme={'teal'}
                  onClick={
                    (e) => onOrder(key)
                }>Order</Button>
              </Flex>
              <Flex gap={10}
                direction={'row'}
                marginInline={'auto'}
                flexWrap={'wrap'}
                justify={'center'}>
                {
                ads ?. map((ad) => {
                  return (
                    <Flex gap={2}
                      direction={'column'}
                      key={
                        ad.CustomAdID
                    }>
                      <Flex justify={'center'}>
                        <Image width={200}
                          height={250}
                          src={
                            ad.Image !
                          }
                          loader={imageLoader}/>
                      </Flex>
                      <Flex justify={'center'}
                        direction={'column'}
                        gap={2}>
                        <Flex justify={'center'}
                          gap={5}>
                          <Text>Created: {
                            convertDateToString2DigitsShortMonthYear(ad.CreatedAt !, locale)
                          }</Text>
                          <Text>Until: {
                            convertDateToString2DigitsShortMonthYear(ad.EndDate !, locale)
                          }</Text>
                        </Flex>
                        <Flex justify={'center'}
                          gap={5}>
                          <Text>Name: {
                            ad.Name
                          }</Text>
                          <Text>Order: {
                            ad.Order
                          }</Text>
                        </Flex>
                      </Flex>
                      <Flex gap={4}
                        justify={'center'}>
                        <Button colorScheme={'blue'}
                          onClick={
                            (e) => {
                              return push(`/admin-ad/${
                                ad.CustomAdID
                              }/edit`)
                            }
                        }>Edit</Button>
                        <Button colorScheme={'red'}
                          onClick={
                            (e) => onDelete(ad.CustomAdID !)
                        }>Delete</Button>
                      </Flex>
                    </Flex>
                  )
                })
              } </Flex>
            </Flex>
          )
        })
      } </Flex>
    </>
  )
};

export async function getStaticProps({
  locale = 'en'
} : GetStaticPropsContext) {
  const customAds = await AdService.getAllAds();
  const groupedCustomAds = CustomAdFactory.groupByWidthAndHeight(customAds);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      ads: groupedCustomAds
    }
  }
}

export default AdminAdIndexPage;

