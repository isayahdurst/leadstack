import {
    TableContainer,
    Table,
    Popover,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    PopoverTrigger,
    PopoverContent,
    Box,
    Flex,
    ButtonGroup,
    PopoverArrow,
    PopoverHeader,
    Button,
    useDisclosure,
    Input,
    InputGroup,
    InputLeftElement,
    Avatar,
    HStack,
    Text,
    Tag,
    PopoverFooter,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import ClientDetails from '@components/Clients/ClientDetails';
import { AddIcon } from '@chakra-ui/icons'
import { ADD_CLIENT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useColorMode } from '@chakra-ui/react';
import Auth from '@utils/auth';
import '../../App.css';

const ClientsTable = ({ clients }) => {
    // Handle page pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const rowsPerPage = 8;
    const totalRows = clients.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const { colorMode } = useColorMode();
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    
    // Handle search
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    
    // Filter by multiple parameters
    const filteredClients = clients.filter(
        (client) =>
            client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const displayedClients = filteredClients.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    
    // Avatar colors
    const colors = ['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B'];
    
    const getColorIndex = (name) => {
        const charCodeSum = name
            .split('')
            .map((char) => char.charCodeAt())
            .reduce((sum, code) => sum + code, 0);
        return charCodeSum % colors.length;
    };
    
    // Handle update client information
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedClient, setSelectedClient] = useState(null);
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        salesPerson: '',
        status: '',
    });

    // Add new client
    const defaultStatus = 'Active'
    const profileId = Auth.getProfile().data._id;

    const [addClient] = useMutation(ADD_CLIENT);
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await addClient({
          variables: {
            first_name: formState.firstName,
            last_name: formState.lastName,
            phone_number: formState.phoneNumber,
            email: formState.email,
            sales_person: profileId,
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
    <div id='table 'style={{ margin: '0 65px' }} >
       <Flex justify='flex-start' alignItems='center' mt={10} css={{ '@media (max-width: 768px)': { flexWrap: 'wrap' } }}>
            <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
                />
                <Input
                type='text'
                placeholder='Search by name, email, or phone'
                value={searchQuery}
                onChange={handleSearch}
                style={{ width: '450px' }}
                mb={4}
                />
            </InputGroup>
            <Button
                leftIcon={<AddIcon />}
                colorScheme='gray'
                color='#7E8299'
                size='md'
                ml='1'
                mb={4}
                flexShrink={0}
                css={{ '@media (max-width: 768px)': { marginTop: '10px' } }}
                onClick={onOpen}
            >
                Add Client
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mt={5}>Add New Client</ModalHeader>
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
                            <FormControl isRequired>
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
        </Flex>

        <TableContainer >
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Client</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Status</Th>
                        <Th>Details</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {displayedClients.map((client) => (
                        <Tr
                            key={client._id}
                            style={{ fontSize: '16px' }}
                        >
                            <Td>
                                <HStack>
                                    <Avatar
                                        name={
                                            client.first_name + ' ' + client.last_name
                                        }
                                        size='sm'
                                        bg={colors[getColorIndex(client.first_name)]}
                                        color='white'
                                    />
                                    <Text>
                                        {client.first_name} {client.last_name}
                                    </Text>
                                </HStack>
                            </Td>
                            <Td>{client.email}</Td>
                            <Td>{client.phone_number}</Td>
                            <Td>
                            <Tag 
                            variant='solid'
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: client.status === 'Inactive' ? '#e78b2f' : '#75CC68',
                                backgroundColor: client.status === 'Inactive' ? '#FCF2E8' : '#EEFBEC',
                            }}>
                            {client.status}
                        </Tag>
                            </Td>
                            <Td>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            style={{
                                                color: '#7E8299',
                                                padding: '10px 40px',
                                            }}>
                                            View
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        style={{ width: '125px' }}>
                                        <PopoverArrow />
                                        <PopoverHeader>
                                        <span
                                            style={{ cursor: 'pointer'}}
                                            mb={4}
                                            onClick={() => {
                                                setSelectedClient(client);
                                                setFormState({
                                                    firstName: client.first_name,
                                                    lastName: client.last_name,
                                                    phoneNumber: client.phone_number,
                                                    email: client.email,
                                                    status: client.status,
                                                });
                                                onOpen();
                                            }}>
                                            Edit
                                        </span><br></br>
                                        <span
                                            style={{ cursor: 'pointer' }}>
                                            Delete
                                        </span>
                                        </PopoverHeader>
                                    </PopoverContent>
                                </Popover>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <div style={{ position: 'relative', bottom: '0' }}>
                {totalPages > 1 && (
                    <Flex
                        justify='left'
                        alignItems='center'
                        mt={8}
                        style={{ marginBottom: '50px' }}>
                        <ButtonGroup>
                            <Button
                                isDisabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i}
                                variant={
                                    currentPage === i + 1 ? 'solid' : 'outline'
                                }
                                onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </Button>
                        ))}
                            <Button
                                isDisabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </Flex>
                )}
            </div>
        </TableContainer>
        {selectedClient && (
            <ClientDetails
                client={selectedClient}
                onClose={() => setSelectedClient(null)}
            />
        )}
    </div>
  );
};

export default ClientsTable;
