import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    useColorModeValue,
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
    FormHelperText,
    Input,
    HStack,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client'
import { useState } from 'react';
import Auth from '@utils/auth';
import RenderSMS from './RenderSMS';
import { SEND_SMS } from '@utils/mutations';

const SMSCard = ({selectedClientId}) => {
    const color = useColorModeValue('gray.100', 'gray.700');
    
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const toast = useToast()
    const [body, setBody] = useState('')
    const [clientPhoneNumber, setClientPhoneNumber] = useState('')

    // Define the mutation to send the SMS
    const [sendSMS, { loading, error }] = useMutation(SEND_SMS);
    
    //define function to handle sending sms
    const handleSendSMS = () => {
        sendSMS({
          variables: {
            client: selectedClientId,
            salesPerson: Auth.getProfile().data._id,
            body,
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

      //reload page function
      function refreshPage() {
        window.location.reload(false);
      }

    return (
        <>
        <Card
            height={'100%'}
            flexGrow={1}
            bg={color}
            flexShrink={0}
            flexBasis={'40%'}>
            <CardHeader>
                <HStack>
                    <Heading size={'lg'}>SMS: 
                    <Button onClick={onOpen} colorScheme={'red'} variant={'outline'}>Send SMS</Button>
                    </Heading>
                </HStack>
            </CardHeader>
            <CardBody overflowY={'scroll'} marginBottom={5}>
                <Flex height={'100%'} flexDirection={'column'} gap={2}>
                    <RenderSMS clientId={selectedClientId}/>
                </Flex>
            </CardBody>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Compose SMS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <Text>Sales Person Phone Number: {Auth.getProfile().data.phone_number}</Text>
                <Text>Client Phone Number: <Input value={clientPhoneNumber} onChange={(e) => setClientPhoneNumber(e.target.value)}/> </Text>
                <FormHelperText>Enter Body of SMS</FormHelperText>
                <Input value={body} onChange={(e) => setBody(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
            <Button onClick={()=> {
              handleSendSMS();
              onClose();
              refreshPage();
            }} disabled={loading} colorScheme={'red'} variant={'outline'}>Send</Button>
            {error && <p>Error: {error.message}</p>}
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    );
};

export default SMSCard;
