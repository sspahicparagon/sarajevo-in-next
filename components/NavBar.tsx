import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';

import navStyle from '../styles/Navigation.module.css';
import { CategoryIcons } from '../values/GlobalValues';
import { useTranslation } from 'next-i18next';
import ChakraNextLink from './ChakraNextLink';
import { useSession } from 'next-auth/react';
import { TranslationType } from '../interfaces/TranslationType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WithSubnavigation() {
    const { isOpen, onToggle, onClose } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={'var(--base-color)'}
                color={'var(--color-gray)'}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                alignItems={'end'}
                justifyContent={'flex-end'}
                margin={'auto'}
            >
                <Flex
                    display={{ base: 'flex', md: 'none' }}
                    alignItems={'center'}
                    justifyContent={'end'}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            <HamburgerIcon w={5} h={5}/>
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                        className={navStyle['nav-icon']}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={'center'} display={{ base: 'none', md: 'flex' }}>
                    <Flex>
                        <DesktopNav />
                    </Flex>
                </Flex>
            </Flex>
            {isOpen && <MobileNav isOpen={isOpen} onToggle={onClose}/>}
        </Box>
    );
}

const DesktopNav = () => {
    const { data } = useSession();
    const { t } = useTranslation<TranslationType>('common')
    const popoverContentBgColor = 'var(--base-color)';
    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => {
                if(navItem.checkCondition && data == null) return;
                return (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box>
                                <ChakraNextLink
                                    href={navItem.href ?? '#'}
                                    className={navStyle['desktop-nav-item']}>
                                    {t(navItem.label)}
                                </ChakraNextLink>
                                {navItem.children && 
                                <Icon
                                    as={ChevronDownIcon}
                                    color={'var(--color-gray)'}
                                    w={6}
                                    h={6}
                                />}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                margin={0}
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack mb={'0'}>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
                )
})}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    const { t } = useTranslation<TranslationType>('common');
    return (
        <ChakraNextLink
            href={href ?? '#'}
            role={'group'}
            className={navStyle['desktop-nav-subitem']}
        >
            <Stack direction={'row'} align={'center'} _groupHover={{ color: 'var(--indicator-color)' }}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        fontWeight={500}>
                        {t(label)}
                    </Text>
                    <Text fontSize={'md'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </ChakraNextLink>
    );
};

const MobileNav = ({ isOpen, onToggle }: {isOpen: boolean, onToggle: () => void}) => {
    return (
        <Collapse in={!isOpen} animateOpacity animate>
            <Drawer placement={'top'} onClose={onToggle} isOpen={isOpen} size={'full'} returnFocusOnClose={false}>
            <DrawerOverlay animate={true} />
            <DrawerContent backgroundColor={'var(--base-color)'} color={'var(--color-gray)'}>
            <DrawerCloseButton onClick={onToggle}/>
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
            {
                    NAV_ITEMS.map((navItem) => (
                        <MobileNavItem key={navItem.label} onToggle={onToggle} {...navItem} />
                    ))
                }
            </DrawerBody>
            </DrawerContent>
        </Drawer>
      </Collapse>
    );
};

const MobileNavItem = ({ label, children, href, checkCondition, onToggle }: NavItem & { onToggle: () => void }) => {
    const { t } = useTranslation<TranslationType>('common');
    const { data } = useSession();
    if(checkCondition && !data) return null;
    return (
        <VStack spacing={2}>
            <Flex
                href={href ?? '#'}
                as={ChakraNextLink}
                onClick={href ? onToggle : undefined}
                p={2}
                rounded={'md'}
                align={'center'}
            >
                <>
                    <Text
                        fontWeight={600}
                        fontSize={'3xl'}
                    >
                        {t(label)}
                    </Text>
                </>
            </Flex>
            {children && 
                <Stack
                p={2}
                align={'center'}
                dir='row'
                fontSize={'xl'}
                w={'100%'}
                justifyContent={'center'}>
                {
                    children.map((child) => (
                    <VStack                             
                        borderTop={'1px solid var(--color-gray)'} 
                        w={'100%'}
                        textAlign={'center'}
                        p={3}
                        justify={'center'}
                        onClick={child.href ? onToggle : undefined}
                        key={child.label}
                    >
                        <FontAwesomeIcon icon={CategoryIcons[child.label]} size={'sm'}/>
                        <ChakraNextLink 
                            key={child.label} 
                            className={navStyle['mobile-nav-subitem']} 
                            href={child.href ?? '#'}
                            textAlign={'center'}>
                            {t(child.label)}
                        </ChakraNextLink>
                    </VStack>
                    ))
                }
                </Stack>
            }
        </VStack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    checkCondition?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Event',
        href: '/event'
    },
    {
        label: 'Blog',
        href: '/posts'
    },
    {
        label: 'Admin',
        href: '#',
        checkCondition: true,
children : [
  {
    label: 'Event',
    href: '/admin-event'
  }, {
    label: 'Location',
    href: '/admin-location'
  }, {
    label: 'Ad Type',
    href: '/admin-ad/type'
  }, {
    label: 'Custom Ad',
    href: '/admin-ad'
  }
]

    },
    {
        label: 'Privacy',
        href: '/privacy'
    },
    {
        label: 'Category',
        children: Object.keys(CategoryIcons).map(key => { return { label: key, href: "/groupes/" + encodeURIComponent(key) }; })
    }
];