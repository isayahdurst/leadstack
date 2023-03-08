import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    useColorModeValue,
    List,
    ListItem,
    useToast,
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    ModalFooter,
    
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client'
import { useRef, useState } from 'react';
import Auth from '@utils/auth';
import SmsPreview from './smsPreview';
import { SEND_SMS } from '@utils/mutations';


const SMSCard = ({selected}) => {
    const color = useColorModeValue('gray.100', 'gray.700');
    const className = `client-card${selected ? ' active' : ''}`;
    const btnRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const toast = useToast()
    const [body, setBody] = useState('')

    // Define the mutation to send the SMS
    const [sendSMS, { loading, error }] = useMutation(SEND_SMS);
    

    //define function to handle sending sms
    const handleSendSMS = () => {
        sendSMS({
          variables: {
            to: clientPhoneNumber,
            body: smsBody,
          },
        })
        .then(() => {
            toast({ title: 'message sent', status: 'success' });
        })
        .catch(error => {
            console.error(error);
            toast({ title: 'stuff broke', status: 'error' });
        });
      };

    return (
        <>
        <Card
            height={'100%'}
            flexGrow={1}
            bg={color}
            flexShrink={0}
            flexBasis={'40%'}>
            <CardHeader>
                <Heading>SMS</Heading>
            </CardHeader>
                <CardBody>
                <Flex height={'100%'} flexDirection={'column'} gap={2}>
                    <List>
                        {/*<ListItem key={sms.id} onClick={() => setSelectedSMS(sms)}>
                            {sms.message}
                        </ListItem>*/}
                    </List>
                    <SmsPreview />
                    <SmsPreview />
                    <SmsPreview />
                    <SmsPreview />
                </Flex>
                <Button onClick={onOpen}>Send SMS</Button>
            </CardBody>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Compose SMS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {/*<Form>
            <FormControl>
                <Text>Sales Person Phone Number: {Auth.getProfile().data.phone_number}</Text>
                <Text>Client Phone Number: {selected.phone_number}</Text>
                <FormHelperText>Enter Body of SMS</FormHelperText>
                <Input value={body} onChange={(e) => setBody(e.target.value)} />
            </FormControl>
            </Form>  */}
          </ModalBody>
          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
            <Button onClick={handleSendSMS} disabled={loading}>Send Message</Button>
            {error && <p>Error: {error.message}</p>}
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
        
    );
};

export default SMSCard;
