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
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem,
    useDisclosure,
    useColorMode,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon
  } from "@chakra-ui/icons";
import { ImCool, ImCool2 } from 'react-icons/im';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Auth from '../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

const NavBar = ({ children }) => {
    const { loggedIn, updateAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const isDesktop = useBreakpointValue({
        base: false,
        lg: true,
    });

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const navToHome = () => {
        navigate('/');
    };

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const links = {
        Dashboard: '/',
        Contacts: '/contacts',
        Profile: '/profile',
        Conversations: '/conversations',
        Support: '/support',
    };

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
                style={{ margin: '0 125px' }}
                mb={{ base: '5', md: '5' }}>
                <Container py={{ base: '4', lg: '5' }} maxWidth='full'>
                    <HStack spacing='10' justify='space-between' mt={4}>
                        {!isDesktop ? (
                            <Flex justify='center' flex='1'>
                                <Link to='/'>
                                    <Heading>
                                        <span>Lead</span>
                                        <span style={{ color: 'red' }}>
                                            Stack
                                        </span>
                                    </Heading>
                                </Link>
                            </Flex>
                        ) : (
                            <Flex justify='space-between' flex='1'>
                                <Link to='/'>
                                    <Heading style={{ fontSize: '1.8rem' }}>
                                        <span>
                                            <FontAwesomeIcon
                                                style={{
                                                    margin: '2px 2px 0 0',
                                                }}
                                                icon={faCubes}
                                            />
                                            Lead
                                        </span>
                                        <span style={{ color: 'red' }}>
                                            Stack
                                        </span>
                                    </Heading>
                                </Link>
                                {/* TODO: Add a search bar and ensure this menu is only visible when the user is logged in */}
                                {loggedIn && (
                                    <ButtonGroup
                                        variant='link'
                                        spacing='8'
                                        mt={2}>
                                        {[
                                            'Dashboard',
                                            'Contacts',
                                            'Conversations',
                                            'Support',
                                            'Profile',
                                        ].map((item) => (
                                            <Link key={item} to={links[item]}>
                                                <Button>{item}</Button>
                                            </Link>
                                        ))}
                                    </ButtonGroup>
                                )}
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
                                    {loggedIn ? (
                                        <>
                                            <Button
                                                colorScheme='red'
                                                onClick={(event) => {
                                                    logout(event);
                                                    updateAuth(Auth.loggedIn());

                                                    navToHome();
                                                }}>
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Login loggedIn={loggedIn} />
                                            <Signup />
                                        </>
                                    )}
                                </HStack>
                            </Flex>
                        )}
                      <Menu>
                           <MenuButton 
                            size={"md"}
                            aria-label={"Open Menu"}
                            display={{ md: "none" }}
                            >
                                 <HamburgerIcon />
                           </MenuButton>
                           <MenuList>
                                {Object.keys(links).map((item) => (
                                <MenuItem key={item}  as={Link} to={links[item]}>
                                    {item}
                                </MenuItem>
                                ))}
                            </MenuList>
                         </Menu>
                   
                    </HStack>
                </Container>
            </Box>
            {children}
        </Box>
    );
};

export default NavBar;
