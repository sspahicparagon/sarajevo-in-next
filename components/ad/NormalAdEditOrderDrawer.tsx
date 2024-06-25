import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button
} from "@chakra-ui/react";
import DraggableList from "../common/DraggableList";
import {CustomAdFull} from "../../interfaces/CustomAd";
import useReorderNormalAd from "../../hooks/useReorderNormalAd";

const NormalAdEditOrderDrawer = ({isOpen, onClose, ads} : {
  isOpen: boolean,
  onClose: () => void,
  ads: CustomAdFull[]
}) => {
  const {onSave, items, onReorder} = useReorderNormalAd(ads);

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen}
      onClose={onClose}
      placement={'right'}>
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader>Order ads</DrawerHeader>
        <DrawerBody>{
          items.length > 0 && <DraggableList ads={items}
            onReorder={onReorder}/>
        }</DrawerBody>
        <DrawerFooter>
          <Button variant={'outline'}
            w={'100%'}
            colorScheme={'teal'}
            onClick={
              (e) => handleSave()
          }>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
};

export default NormalAdEditOrderDrawer;

