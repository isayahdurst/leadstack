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
    Box
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import SignupConfirmation from './SignupConfirmation';
import { ADD_SALESPERSON } from 'utils/mutations';
import Auth from '../../utils/auth';

function Signup() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = useRef();
    const btnRef = useRef();
    const [formState, setFormState] = useState({ firstName: '', lastName: '', phoneNumber: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_SALESPERSON)

    const addSalesperson = async () => {
        console.log(formState.firstName)
        console.log(formState.lastName)
        console.log(formState.phoneNumber)
        console.log(formState.email)
        console.log(formState.password)
        const mutationResponse = await addUser({
            variables: {
                first_name: formState.firstName,
                last_name: formState.lastName,
                phone_number: formState.phoneNumber,
                email: formState.email,
                password: formState.password,
            }
        });

        //const token = mutationResponse.data.addUser.token;
        //Auth.login(token);

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
          <Button ref={btnRef} colorScheme='red' onClick={onOpen}>
                Sign up
          </Button>
          <Drawer
                isOpen={isOpen}
                placement='top'
                onClose={onClose}
                initialFocusRef={firstField}
                finalFocusRef={btnRef}
                size='xl'
          >
            <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Create your account</DrawerHeader>

                    <DrawerBody>
                        <form
                            id='loginForm'
                            className='visible'
                            onSubmit={(e) => {
                                e.preventDefault()
                                console.log('submitted')
                                addSalesperson();
                            }}
                        >
                            <Stack spacing='24px'>
                                <Box>
                                    <FormLabel htmlFor='firstName'>First Name:</FormLabel> 
                                    <Input 
                                        ref={firstField}
                                        name="firstName"
                                        type="firstName"
                                        id='firstName' 
                                        onChange={handleChange}
                                    />
                                </Box>
                                
                                <Box>
                                    <FormLabel htmlFor='lastName'>Last Name:</FormLabel> 
                                    <Input 
                                        id='lastName'
                                        name="lastName"
                                        type="lastName"
                                        onChange={handleChange}
                                    />
                                </Box>
                                    
                                <Box>
                                    <FormLabel htmlFor='phoneNumber'>Phone Number:</FormLabel> 
                                    <Input 
                                        id='phoneNumber'
                                        name="phoneNumber"
                                        type="phoneNumber"
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box>
                                    <FormLabel htmlFor='email'>Email:</FormLabel> 
                                    <Input 
                                        id='email'
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box>
                                    <FormLabel  htmlFor='password'>Password:</FormLabel> 
                                    <Input 
                                        id='password' 
                                        name="password"
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
                        <Button type='submit' form='loginForm' colorScheme='red'>Create Account!</Button>
                    </DrawerFooter>
                </DrawerContent>
          </Drawer>
        </>
      )
}

export default Signup;
