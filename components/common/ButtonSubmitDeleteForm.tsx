import {Button} from "@chakra-ui/react"

const ButtonSubmitDeleteForm = ({isLoading} : {
  isLoading: boolean
}) => {
  return (
    <Button type={'submit'}
      colorScheme={'red'}
      size={'lg'}>
      Delete
    </Button>
  );
};

export default ButtonSubmitDeleteForm;

