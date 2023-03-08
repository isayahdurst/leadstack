import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Box,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_SALESPERSON } from 'utils/mutations';
import Auth from '@utils/auth';

function Login({ setLoggedIn }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = useRef();
    const btnRef = useRef();
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN_SALESPERSON);
    const navigate = useNavigate();

    const loginSalesperson = async () => {
        const { data } = await login({
            variables: {
                email: formState.email,
                password: formState.password,
            },
        });

        const token = data.login.token;
        Auth.login(token);
        console.log('auth logged in?');
        console.log(data.login.sales_person);
        console.log(Auth.loggedIn());
        console.log(token);
        console.log(Auth.getProfile().data);
        setLoggedIn(Auth.loggedIn());
    };

    const navToHome = () => {
        navigate('/');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
            <Button ref={btnRef} onClick={onOpen}>
                Sign in
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='top'
                onClose={onClose}
                initialFocusRef={firstField}
                finalFocusRef={btnRef}
                size='xl'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Sign into your account!{' '}
                    </DrawerHeader>

                    <DrawerBody>
                        <form
                            id='loginForm'
                            className='visible'
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log('submitted');
                                try {
                                    loginSalesperson();
                                    onClose();
                                    navToHome();
                                } catch (e) {
                                    console.error(e);
                                }
                            }}>
                            <Stack spacing='24px'>
                                <Box>
                                    <FormLabel htmlFor='email'>
                                        Email:
                                    </FormLabel>
                                    <Input
                                        ref={firstField}
                                        id='email'
                                        name='email'
                                        type='email'
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box>
                                    <FormLabel htmlFor='password'>
                                        Password:
                                    </FormLabel>
                                    <Input
                                        id='password'
                                        name='password'
                                        type='password'
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Stack>
                        </form>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            form='loginForm'
                            colorScheme='red'>
                            Sign In
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Login;
