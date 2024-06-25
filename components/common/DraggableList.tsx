import {Flex, Text} from "@chakra-ui/react";
import {Reorder, useDragControls} from "framer-motion";
import {CustomAdFull} from "../../interfaces/CustomAd";
import Image from "next/image";
import imageLoader from "../../lib/imageLoader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const DraggableList = ({ads, onReorder} : {
  ads: CustomAdFull[],
  onReorder: (items : CustomAdFull[]) => void
}) => {
  return (
    <Reorder.Group axis="y"
      values={ads}
      onReorder={onReorder}
      style={
        {
          listStyle: 'none',
          position: 'relative'
        }
    }>
      {
      ads.map((item) => {
        return (
          <Reorder.Item key={
              item.CustomAdID ! + item.Name !
            }
            value={item}
            dragTransition={
              {bounceStiffness: 1000}
            }
            style={
              {
                padding: 4,
                marginBlock: 5,
                borderRadius: 10,
                position: 'relative'
              }
          }>
            <Flex align={'center'}
              justify={'start'}
              width={250}
              gap={10}>
              <Image src={
                  item.Image !
                }
                width={'100px'}
                height={'100px'}
                loader={imageLoader}
                style={
                  {
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }
                }
                draggable={false}/>
              <Text textAlign={'center'}
                width={'45%'}
                userSelect={'none'}>
                {
                item.Name
              }</Text>
              <FontAwesomeIcon icon={faBars}
                cursor={'grab'}
                width={'45%'}/>
            </Flex>
          </Reorder.Item>
        )
      })
    } </Reorder.Group>
  );
};

export default DraggableList;

