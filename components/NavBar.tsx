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
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';

import navStyle from '../styles/Navigation.module.css';
import { CategoryIcons, CookieName } from '../values/GlobalValues';
import { useTranslation } from 'next-i18next';
import ChakraNextLink from './ChakraNextLink';
import { useSession } from 'next-auth/react';

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box marginTop={'var(--toolbar-container-height)'}>
            <Flex
                bg={'var(--base-color)'}
                color={'var(--color-gray)'}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
            >
                <Flex
                    flex={'auto'}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                        className={navStyle['nav-icon']}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={'center'}>
                    <Flex 
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <DesktopNav />
                    </Flex>
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const { data } = useSession();
    
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
                                    {navItem.label}
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
    const { t } = useTranslation('common');
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

const MobileNav = () => {
    return (
        <Stack
        bg={'var(--base-color)'}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, checkCondition }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
    const { t } = useTranslation('common');
    const { data } = useSession();
    if(checkCondition && !data) return null;
    return (
        <Stack spacing={4} onClick={onToggle}>
        <Flex
            href={href ?? '#'}
            as={ChakraNextLink}
            p={2}
            rounded={'md'}
        >
            <>
                <Text
                    fontWeight={600}
                    color={'var(--color-gray)'}
                >
                {label}
                </Text>
                {children && (
                <Icon
                    as={ChevronDownIcon}
                    transition={'all .25s ease-in-out'}
                    transform={isOpen ? 'rotate(180deg)' : ''}
                    color={'var(--color-gray)'}
                    paddingTop={'2px'}
                    w={6}
                    h={6}
                />
                )}
            </>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
            <Stack
            mt={2}
            pl={4}
            align={'start'}
            color={'var(--color-gray)'}>
            {children &&
                children.map((child) => (
                <ChakraNextLink key={child.label} className={navStyle['mobile-nav-subitem']} href={child.href ?? '#'}>
                    {t(child.label)}
                </ChakraNextLink>
                ))}
            </Stack>
        </Collapse>
        </Stack>
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
        label: 'Category',
        children: Object.keys(CategoryIcons).map(key => { return { label: key, href: "/groupes/" + encodeURIComponent(key) }; })
    },
    {
        label: 'Admin',
        href: '/admin-event',
        checkCondition: true
    }
];