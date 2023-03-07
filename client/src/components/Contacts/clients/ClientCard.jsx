import {
    Box,
    Text,
    List,
    ListItem,
    ListIcon,
    useColorModeValue,
    ScaleFade,
    CardHeader,
    Heading,
    Button,
    // Form,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import Auth from '../../../utils/auth';

const Form = ({children}) => children // XXX

const ClientCard = ({ name, phone, email, selected, onClick }) => {
    const className = `client-card${selected ? ' active' : ''}`;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef()
    const DrawerFooter = false

    const toast = useToast()
    const [body, setBody] = useState('')

    const handleSendSms = async () => {     
        try {
            await post('/send-sms', { salesPersonPhoneNumber, clientPhoneNumber, smsBody })
            toast({ title: 'message sent', status: 'succes' })
        } catch (err) {
            console.error(err)
            toast({ title: 'stuff broke', status: 'error' })
        }
    };

    const handleSendEmail = async () => {
        try {
            await post('/send-email', {salesPersonEmail, clientEmail, emailBody })
            toast({ title: 'email sent', status: 'succes' })
        } catch (err) {
            console.error(err)
            toast({ title: 'stuff broke', status: 'error' })
        }
    };

    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Box
                maxW={'20rem'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={useColorModeValue('md', 0)}
                rounded={'md'}
                overflow={'hidden'}
                mb={2}
                className={className}
                onClick={onClick}>
                <Box
                    bg={useColorModeValue('gray.50', 'gray.900')}
                    px={4}
                    py={4}
                    // TODO: Border can be added to toggle "Active" lead.
                    /* border={'2px'}
                    borderColor={'red.300'}
                    borderRadius={6} */
                >
                    <CardHeader>
                        <Heading>Lead Information:</Heading>
                    </CardHeader>
                    <List spacing={3}>
                        <ListItem key={name}>
                            <Text as='b'>name: {selected.name} test</Text>
                        </ListItem>
                        <ListItem key={phone}>
                            <ListIcon as={PhoneIcon} color='red.400' />
                            <Text>: {selected.phone_number}5083950012</Text>
                        </ListItem>
                        <ListItem key={email}>
                            <ListIcon as={EmailIcon} color='red.400' />
                            <Text>: {selected.email}test@test.com</Text>
                        </ListItem>
                    </List>
                    <Button leftIcon={<PhoneIcon/>}
                    mt={4}
                    colorScheme='red'
                    type='button'
                    onClick={onOpen}>
                        Send SMS   
                    </Button>
                    <Button
                    leftIcon={<EmailIcon/>}
                    mt={4}
                    colorScheme='red'
                    type='button'
                    onClick={onOpen}
                    >Send Email
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                        finalFocusRef={btnRef}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Compose SMS</DrawerHeader>
                            <DrawerBody>
                                <Form>
                                    <FormControl>
                                        <Text>Sales Person Phone Number: {Auth.getProfile().data.phone_number}</Text>
                                        <Text>Client Phone Number: {selected.phone_number}</Text>
                                        <FormHelperText>Enter Body of SMS</FormHelperText>
                                        <Input value={body} onChange={(e) => setBody(e.target.value)} />
                                    </FormControl>
                                </Form>  
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button leftIcon={<PhoneIcon/>} 
                                colorScheme='red'
                                isLoading
                                loadingText='Sending'
                                spinnerPlacement='start'
                                type='submit'
                                onClick={handleSendSms}
                                >Send SMS</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}>
                        <DrawerHeader>Compose Email</DrawerHeader>
                        <DrawerBody>
                            <Text>Sales Person Email: `{Salesperson.email}`</Text>
                            <Text>Client Email: `{selected.email}`</Text>      
                            <Box>  
                                <Form>
                                    <FormLabel htmlFor='desc'>Enter Body of email</FormLabel>
                                    <Input value={body} onChange={(e) => setBody(e.target.value)} />
                                </Form>  
                            </Box>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button leftIcon={<EmailIcon/>} 
                            colorScheme='red'
                            isLoading
                            loadingText='Sending'
                            spinnerPlacement='start'
                            type='submit'
                            onClick={handleSendEmail}
                            >Send Email</Button>
                        </DrawerFooter>
                    </Drawer>
                </Box>
            </Box>
        </ScaleFade>
    );
};

export default ClientCard;
