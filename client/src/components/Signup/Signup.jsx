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
    InputGroup,
    InputLeftElement,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Box
} from '@chakra-ui/react';
import {
    PhoneIcon,
    EmailIcon,
    LockIcon,
    SpinnerIcon
} from '@chakra-ui/icons'
import { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import SignupConfirmation from './SignupConfirmation';
import { ADD_SALESPERSON } from 'utils/mutations';
import Auth from '../../utils/auth';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = useRef();
    const btnRef = useRef();
    const [formState, setFormState] = useState({ firstName: '', lastName: '', phoneNumber: '', email: '', password: '', passwordConfirm: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [addUser] = useMutation(ADD_SALESPERSON);
    const navigate = useNavigate();

    const validate = values => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = 'Required';
        }
      
        if (!values.lastName) {
          errors.lastName = 'Required';
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Required';
          } else if (!/^[0-9]+$/i.test(values.phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number -- Please only use numbers.';
          } else if (values.phoneNumber.length < 10) {
            errors.phoneNumber = 'Invalid phone number -- Please enter a 10 digit phone number.';
          }
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address.';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.password)) {
            errors.password = 'Invalid password -- minimum of 8 characters, needs one Uppercase Character, one Lowercase Character and one Number.';
        }

        if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Required';
        } else if (values.passwordConfirm != values.password) {
            errors.passwordConfirm = 'Passwords do not match!';
        }
      
        return errors;
      };

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          password: '',
          passwordConfirm: '',
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
    });

    const moveToDash = () => {
        navigate('/dashboard');
    };


    


    const addSalesperson = async (event) => {
        event.preventDefault()
        
        
            const { data } = await addUser({
                variables: {
                    first_name: formik.values.firstName,
                    last_name: formik.values.lastName,
                    phone_number: formik.values.phoneNumber,
                    email: formik.values.email,
                    password: formik.values.password,
                }
            });
    
            const token = data.addSalesperson.token;
            Auth.login(token);
            console.log('auth logged in?');
            console.log(Auth.loggedIn());
       
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    // Show and hide password helper functions:
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    
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
                            onSubmit={async (event) => {
                                try{
                                    await addSalesperson(event);
                                    onClose();
                                    moveToDash();
                                } catch (e) {
                                    setErrorMessage(
                                        e.message
                                    );
                                    console.log(e)  
                                }
                            }}
                        >
                            <Stack spacing='24px'>
                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children='FN'
                                            color='gray.300'
                                        />
                                        <Input 
                                            id='firstName'
                                            name='firstName'
                                            type='text'
                                            placeholder='First Name'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstName}
                                        />
                                    </InputGroup>
                                    {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                                </Box>
                                
                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children='LN'
                                            color='gray.300'
                                        />
                                        <Input 
                                            id='lastName'
                                            name='lastName'
                                            type='text'
                                            placeholder='Last Name'
                                            isRequired={true}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastName}
                                        />
                                    </InputGroup>
                                    {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                                </Box>
                                    
                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<PhoneIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='phoneNumber'
                                            name='phoneNumber'
                                            type='phone'
                                            placeholder='Phone Number'
                                            errorBorderColor='crimson'
                                            maxLength='10'
                                            isRequired={true}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phoneNumber}
                                        />
                                    </InputGroup>
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}
                                    
                                </Box>

                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<EmailIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='Email'
                                            errorBorderColor='crimson'
                                            isRequired={true}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                    </InputGroup>
                                    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                </Box>

                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<LockIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='password'
                                            name='password'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Password'
                                            isRequired={true}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                </Box>  

                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<LockIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='passwordConfirm'
                                            name='passwordConfirm'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Re-enter Password'
                                            errorBorderColor='crimson'
                                            isRequired={true}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.passwordConfirm}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? <div>{formik.errors.passwordConfirm}</div> : null}
                                </Box>

                                
                                    {errorMessage && (
                                        <div>
                                            <p className="error-text">{errorMessage}</p>
                                        </div>
                                    )}                                  
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

/*    return (
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
                                try {
                                    addSalesperson();
                                } catch (e) {
                                    console.error(e);
                                }
                            }}
                        >
                            <Stack spacing='24px'>
                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children='FN'
                                            color='gray.300'
                                        />
                                        <Input 
                                            id='firstName'
                                            name='firstName'
                                            type='text'
                                            placeholder='First Name'
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </Box>
                                
                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children='LN'
                                            color='gray.300'
                                        />
                                        <Input 
                                            id='lastName'
                                            name='lastName'
                                            type='text'
                                            placeholder='Last Name'
                                            isRequired={true}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </Box>
                                    
                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<PhoneIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='phoneNumber'
                                            name='phoneNumber'
                                            type='phone'
                                            placeholder='Phone Number'
                                            errorBorderColor='crimson'
                                            isRequired={true}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                    
                                </Box>

                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<EmailIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='Email'
                                            errorBorderColor='crimson'
                                            isRequired={true}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </Box>

                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<LockIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='password'
                                            name='password'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Password'
                                            isRequired={true}
                                            onChange={handleChange}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </Box>  

                                <Box>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<LockIcon color='gray.300' />}
                                        />
                                        <Input 
                                            id='passwordConfirm'
                                            name='passwordConfirm'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Re-enter Password'
                                            errorBorderColor='crimson'
                                            isRequired={true}
                                            onChange={handleChange}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
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
}*/

export default Signup;
