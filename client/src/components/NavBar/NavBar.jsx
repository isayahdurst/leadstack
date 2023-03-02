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
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const NavBar = () => {
    const isDesktop = useBreakpointValue({
        base: false,
        lg: true,
    });
    return (
        <Box
            as="section"
            pb={{
                base: '12',
                md: '24',
            }}>
            <Box as="nav" bg="bg-surface" boxShadow="sm" px={5}>
                <Container
                    py={{
                        base: '4',
                        lg: '5',
                    }}
                    maxWidth={'full'}>
                    <HStack spacing="10" justify="space-between">
                        {isDesktop ? (
                            <Flex justify="space-between" flex="1">
                                <Heading>
                                    <span>Lead</span>
                                    <span style={{ color: 'red' }}>Stack</span>
                                </Heading>

                                {/* TODO: Add a search bar and ensure this menu is only visible when the user is logged in */}
                                {/* TODO: Add links to the menu items */}
                                <ButtonGroup variant="link" spacing="8">
                                    {[
                                        'Dashboard',
                                        'Contacts',
                                        'Conversations',
                                        'Support',
                                    ].map((item) => (
                                        <Button key={item}>{item}</Button>
                                    ))}
                                </ButtonGroup>
                                <HStack spacing="3">
                                    <Button variant="solid">Sign in</Button>
                                    <Button variant="solid" colorScheme={'red'}>
                                        Sign up
                                    </Button>
                                </HStack>
                            </Flex>
                        ) : (
                            <IconButton
                                variant="ghost"
                                icon={<FiMenu fontSize="1.25rem" />}
                                aria-label="Open Menu"
                            />
                        )}
                    </HStack>
                </Container>
            </Box>
        </Box>
    );
};

export default NavBar;
