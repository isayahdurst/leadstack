import {
    Box,
    Card,
    Center,
    Stack,
    Heading,
    CardHeader,
    CardBody,
    StackDivider,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    FormControl,
    FormLabel,
    Input
    
} from '@chakra-ui/react';

import { useQuery, useMutation } from '@apollo/client';
import { useColorMode } from '@chakra-ui/react';
import { CLIENTS } from '../../../utils/queries';
import ClientAvatar from '@components/Dashboard/Clients/ClientAvatar';
import React, { useState } from 'react';
import { ADD_CLIENT } from '../../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '@utils/auth';

const ClientsModule = () => {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { loading, data } = useQuery(CLIENTS);
    const clients = data?.clients || [];
    const clientCount = data?.clients.length;
    const salesPersonId = Auth.getProfile().data._id
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        salesPerson: '',
        status: ''
      });
    
      const [addClient] = useMutation(ADD_CLIENT);
      const defaultStatus = 'Active'
      
      const handleSubmit = async (event) => {
          event.preventDefault();
    
        try {
            await addClient({
                variables: {
                    first_name: formState.firstName,
                    last_name: formState.lastName,
                    phone_number: formState.phoneNumber,
                    email: formState.email,
                    sales_person: salesPersonId,
                    status: defaultStatus
                }
            });
            window.location.reload();
            onClose();
        } catch (error) {
              console.error(error);
        }
      };
    
      const handleChange = (event) => {
          const { name, value } = event.target;
    
            setFormState({
                ...formState,
                [name]: value
            });
      };

    return (
        <Center w='400px' h='350px' >
        <Card>
            <CardHeader>
                <Heading size='lg' mt={4}pb={2}>
                    {clientCount}
                </Heading>
                <Heading size='sm' mb={-5}fontWeight={400} color='gray.500'>
                    Current Clients
                </Heading>
            </CardHeader>
            <CardBody mb={5}>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box w='400px' >
                    {loading ? (
                        <div>Loading...</div>
                        ) : (
                        <ClientAvatar
                            clients={clients}
                        />
                    )}
                        <Button 
                            mt={7} 
                            mr={3}
                            variant={ colorMode === 'light' ? 'solid' : 'ghost' }
                            as={Link} 
                            to='/contacts'>
                            All clients
                        </Button>  
                        <Button mt={7} variant='solid' colorScheme='red' onClick={onOpen}>
                            Invite new
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose} size="xl">
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader mt={6}>Add New Client</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl isRequired>
                                            <FormLabel>First Name</FormLabel>
                                                <Input name="firstName" value={formState.firstName} onChange={handleChange} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input name="lastName" value={formState.lastName} onChange={handleChange} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Phone Number</FormLabel>
                                                <Input name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} />
                                            </FormControl>
                                        <FormControl isRequired mb={4}>
                                            <FormLabel>Email</FormLabel>
                                                <Input type="email" name="email" value={formState.email} onChange={handleChange} />
                                        </FormControl>
                                        <Button 
                                            type="submit" 
                                            colorScheme='blue' 
                                            mr={3} 
                                            mb={10}
                                            mt={2}>
                                                Submit
                                        </Button>       
                                        <Button 
                                            onClick={onClose} 
                                            mb={10}
                                            mt={2}
                                            variant={
                                                colorMode === 'light'? 'solid' : 'ghost'
                                            }>
                                                Cancel
                                        </Button>
                                    </form>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    </Center>
    );
};
export default ClientsModule;
