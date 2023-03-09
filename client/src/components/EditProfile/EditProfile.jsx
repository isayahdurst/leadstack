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
    Box,
} from '@chakra-ui/react';
import {
    PhoneIcon,
    EmailIcon,
    LockIcon,
    SpinnerIcon
} from '@chakra-ui/icons'
import { useRef, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SALESPERSON } from 'utils/mutations';
import Auth from '../../utils/auth';
import { useFormik } from 'formik';
import ProfileContext from '../../pages/Profile';
import { AuthContext } from '@contexts/AuthContext';

function EditProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = useRef();
    const btnRef = useRef();
    const [editUser] = useMutation(UPDATE_SALESPERSON);
    const { updateProfileData, profileData } = useContext(AuthContext);
    
    
    
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

        if (!/^$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.password)) {
            errors.password = 'Invalid password -- minimum of 8 characters, needs one Uppercase Character, one Lowercase Character and one Number.';
        }
      
        return errors;
      };

    const formik = useFormik({
        initialValues: {
          firstName: Auth.getProfile().data.first_name,
          lastName: Auth.getProfile().data.last_name,
          phoneNumber: Auth.getProfile().data.phone_number,
          email: Auth.getProfile().data.email,
          password: '',
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
        onReset: {
            firstName: Auth.getProfile().data.first_name,
            lastName: Auth.getProfile().data.last_name,
            phoneNumber: Auth.getProfile().data.phone_number,
            email: Auth.getProfile().data.email,
            password: '',
        },
    });


    const updateSalesperson = async (event) => {
        event.preventDefault()
        try {
            let data;
            if (!formik.values.password){
                data = await editUser({
                    variables: {
                        salesperson_id: Auth.getProfile().data._id,
                        first_name: formik.values.firstName,
                        last_name: formik.values.lastName,
                        phone_number: formik.values.phoneNumber,
                        email: formik.values.email,
                    }
                })
            } else {
                data = await editUser({
                    variables: {
                        salesperson_id: Auth.getProfile().data._id,
                        first_name: formik.values.firstName,
                        last_name: formik.values.lastName,
                        phone_number: formik.values.phoneNumber,
                        email: formik.values.email,
                        password: formik.values.password
                    }
                });
            }         

            Auth.logout();
            const token = data.data.updateSalesperson.token;
            Auth.login(token);
            console.log('auth logged in?');
            console.log(Auth.loggedIn());
            updateProfileData(Auth.getProfile().data);


        } catch (e) {
            console.error(e);
        };
    };

    // Show and hide password helper functions:
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    
    return (
        <>
          <Button ref={btnRef} onClick={onOpen}>
                Edit Profile Information
          </Button>
          <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                initialFocusRef={firstField}
                finalFocusRef={btnRef}
                size='sm'
          >
            <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Create your account</DrawerHeader>

                    <DrawerBody>
                        <form
                            id='loginForm'
                            className='visible'
                            onSubmit={(event) => {
                                onClose();
                                updateSalesperson(event);
                                //refresh();
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
                            </Stack>
                        </form>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type='submit' form='loginForm' colorScheme='red'>Save Changes</Button>
                        
                    </DrawerFooter>
                </DrawerContent>
          </Drawer>
        </>
      )
}
export default EditProfile;