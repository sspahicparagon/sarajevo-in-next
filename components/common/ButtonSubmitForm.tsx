import { Button } from "@chakra-ui/react";

const ButtonSubmitForm = ({ isLoading }: { isLoading: boolean}) => {
  return (
    <Button 
      type={'submit'} 
      isLoading={isLoading}
      size={'lg'}
      variant={'outline'}
      bg={'var(--color-gray)'}
      color={'var(--base-color)'}
      _hover={{ 'color': 'var(--base-color)', 'bg': 'var(--color-gray)' }}
      width={'100%'}
      loadingText={'Saving'}
      margin={'auto'}
    >
      Save
    </Button>
  );
};

export default ButtonSubmitForm;