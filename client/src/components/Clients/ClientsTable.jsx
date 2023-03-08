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
    PopoverFooter
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import ClientDetails from '@components/Clients/ClientDetails';

const ClientsTable = ({ clients }) => {
    // Handle page pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const rowsPerPage = 8;
    const totalRows = clients.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
  
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
    
    
return (
    <div style={{ margin: '0 150px' }}>
        <Flex justify='space-between' alignItems='center' mt={10}>
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
                    style={{ width: '35%' }}
                    mb={4}
                />
            </InputGroup>
        </Flex>
        <TableContainer>
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
                                        padding: '10px 20px',
                                        width: '90px',
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
                                            <Button
                                                style={{ cursor: 'pointer', padding: '0 35px', backgroundColor: '#FFF' }}
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
                                            </Button>
                                            <PopoverFooter>
                                            <Button
                                                style={{ cursor: 'pointer', backgroundColor: '#FFF' }}>
                                                Delete
                                            </Button>
                                            </PopoverFooter>
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
