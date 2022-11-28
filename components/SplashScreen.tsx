import { Flex } from "@chakra-ui/react";
import { faCog, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SplashScreen = () => {
    return (
        <Flex
            width={'100%'}
            height={'900vh'}
            backgroundColor={'var(--base-color)'}
            justifyContent={'center'}
            alignItems={'start'}
            margin={'auto'}
            paddingTop={'50vh'}
            position={'absolute'}
            zIndex={999}
            id={'page-splash'}
            overflowY={'hidden'}
            overflowX={'hidden'}
        >
            <FontAwesomeIcon
                color='var(--color-gray)'
                icon={faSpinner}
                pulse={true}
                size={'3x'}
            />
        </Flex>
    );
}

export default SplashScreen;