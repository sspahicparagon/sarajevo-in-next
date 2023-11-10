import { Flex } from "@chakra-ui/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import IconPlusText from "./IconPlusText";
import LanguageSelector from "./LanguageSelector";
import toolbarStyle from '../styles/Toolbar.module.css';
import NavBar from "./NavBar";

export default function Toolbar() {
    return (
        <>
            <Flex
                flexDirection={'column'}
                width={'100%'}
                className={toolbarStyle['toolbar-wrapper']}

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
                            image={'/instagram-icon.svg'}
                            height={'34px'}
                            width={'34px'}
                            minHeight={'24px'}
                            minWidth={'24px'}
                            openInNewTab={true}
                        />
                    </Flex>
                    <Flex
                        flexDirection={'column'}
                        className={toolbarStyle.column}
                    >
                        <IconPlusText
                            link={'https://www.tiktok.com/@sarajevoin'}
                            image={'/tiktok-icon.svg'}
                            height={'40px'}
                            width={'40px'}
                            minHeight={'24px'}
                            minWidth={'24px'}
                            openInNewTab={true}
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
                            minHeight={'24px'}
                            minWidth={'24px'}
                            text={'info@sarajevoin.ba'}
                            openInNewTab={true}
                        />
                    </Flex>
                    <Flex
                        flexDirection={'column'}
                        className={toolbarStyle.column}
                        width={{'base': '80px', 'md': '110px'}}
                    >
                        <LanguageSelector />
                    </Flex>
                </Flex>
            </Flex>
            <NavBar />
        </>
    )
}