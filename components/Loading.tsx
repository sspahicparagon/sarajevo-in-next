import { color, Flex } from '@chakra-ui/react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoadingConfig {
    width?: string;
    height?: string;
    align?: string;
    justify?: string;
    background?: string;
    color?: string;
}

const Loading = ({
    width = '100%',
    height = '100%',
    align = 'center',
    justify = 'center',
    background = 'var(--base-color)',
    color = 'var(--color-gray)'
}: LoadingConfig) => {
    return (
        <Flex
            width={width}
            height={height}
            background={background}
            justifyContent={justify}
            alignItems={align}
            margin={'auto'}
        >
            <FontAwesomeIcon
                color={color}
                icon={faCog}
                spin={true}
                size={'2xl'}
            />
        </Flex>
    );
}

export default Loading;