import {
  CloseButton,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from "@chakra-ui/react";
import NormalAdTypeForm, {NormalAdTypeFormProps} from "./NormalAdTypeForm";

const NormalAdTypeModal = (props : NormalAdTypeFormProps & {
  isOpen: boolean,
  onClose: () => void
}) => {

  return (
    <Modal isOpen={
        props.isOpen
      }
      onClose={
        props.onClose
      }
      size={
        {
          'base': 'full',
          'md': 'lg'
        }
    }>
      <ModalContent>
        <CloseButton size='lg'
          onClick={
            props.onClose
          }/>
        <ModalHeader>
          <Heading as={'h2'}>Handle Custom Ad Type</Heading>
        </ModalHeader>
        <ModalBody>
          <NormalAdTypeForm {...props}
            onFinished={
              props.onClose
            }/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
};

export default NormalAdTypeModal;

