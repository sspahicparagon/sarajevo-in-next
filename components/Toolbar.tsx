import { Flex } from "@chakra-ui/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import IconPlusText from "./IconPlusText";
import Instagram from '../images/instagram-icon.svg';
import TikTok from '../images/tiktok-icon.svg';
import LanguageSelector from "./LanguageSelector";
import toolbarStyle from '../styles/Toolbar.module.css';

export default function Toolbar() {
    return (
        <Flex
            flexDirection={'column'}
            width={'100%'}
        >
            <Flex
                flexDirection={'row'}
                className={toolbarStyle.container}
            >
                <Flex
                    flexDirection={'column'}
                    className={toolbarStyle.column}
                >
                    <IconPlusText
                        link={'https://www.instagram.com/sarajevo.in/'}
                        image={Instagram.src}
                        height={'34px'}
                        width={'34px'}
                        minHeight={'30px'}
                        minWidth={'30px'}
                    />
                </Flex>
                <Flex
                    flexDirection={'column'}
                    className={toolbarStyle.column}
                >
                    <IconPlusText
                        link={'https://www.tiktok.com/@sarajevoin'}
                        image={TikTok.src}
                        height={'40px'}
                        width={'40px'}
                        minHeight={'30px'}
                        minWidth={'30px'}
                    />
                </Flex>
                <Flex
                    flexDirection={'column'}
                    className={toolbarStyle.column}
                    margin={'auto'}
                >
                    <IconPlusText
                        link={'mailto:info@sarajevoin.ba'}
                        imageFa={faEnvelope}
                        height={'40px'}
                        width={'40px'}
                        minHeight={'30px'}
                        minWidth={'30px'}
                        text={'info@sarajevoin.ba'}
                    />
                </Flex>
                <Flex
                    flexDirection={'column'}
                    className={toolbarStyle.column}
                    width={'90px'}
                >
                    <LanguageSelector />
                </Flex>
            </Flex>
        </Flex>
    )
}