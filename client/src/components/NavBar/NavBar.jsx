import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
    Heading,
    Text,
    useColorModeValue,
    useColorMode,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { ImCool, ImCool2 } from 'react-icons/im';

const NavBar = ({ children }) => {
    const isDesktop = useBreakpointValue({
        base: false,
        lg: true,
    });

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            as='section'
            pb={{ base: '12', md: '24' }}
            minHeight={'100vh'}
            maxHeight={'100vh'}>
            <Box
                as='nav'
                bg='bg-surface'
                boxShadow='sm'
                px={5}
                mb={{ base: '5', md: '5' }}>
                <Container py={{ base: '4', lg: '5' }} maxWidth='full'>
                    <HStack spacing='10' justify='space-between'>
                        {!isDesktop ? (
                            <Flex justify='center' flex='1'>
                                <Heading>
                                    <span>Lead</span>
                                    <span style={{ color: 'red' }}>Stack</span>
                                </Heading>
                            </Flex>
                        ) : (
                            <Flex justify='space-between' flex='1'>
                                <Heading>
                                    <span>Lead</span>
                                    <span style={{ color: 'red' }}>Stack</span>
                                </Heading>

                                {/* TODO: Add a search bar and ensure this menu is only visible when the user is logged in */}
                                {/* TODO: Add links to the menu items */}
                                <ButtonGroup variant='link' spacing='8'>
                                    {[
                                        'Dashboard',
                                        'Contacts',
                                        'Conversations',
                                        'Support',
                                    ].map((item) => (
                                        <Button key={item}>{item}</Button>
                                    ))}
                                </ButtonGroup>
                                <HStack spacing='3'>
                                    <IconButton
                                        variant='ghost'
                                        icon={
                                            colorMode === 'light' ? (
                                                <ImCool fontSize='1.25rem' />
                                            ) : (
                                                <ImCool fontSize='1.25rem' />
                                            )
                                        }
                                        aria-label='Open Menu'
                                        onClick={() =>
                                            toggleColorMode(
                                                colorMode === 'light'
                                                    ? 'dark'
                                                    : 'light'
                                            )
                                        }
                                    />

                                    <Button
                                        variant={
                                            colorMode === 'light'
                                                ? 'solid'
                                                : 'ghost'
                                        }>
                                        Sign in
                                    </Button>
                                    <Button variant='solid' colorScheme='red'>
                                        Sign up
                                    </Button>
                                </HStack>
                            </Flex>
                        )}
                        {!isDesktop && (
                            <IconButton
                                variant='ghost'
                                icon={<FiMenu fontSize='1.5rem' />}
                                aria-label='Open Menu'
                            />
                        )}
                    </HStack>
                </Container>
            </Box>
            {children}
        </Box>
    );
};

export default NavBar;
