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
    FormControl,
    FormLabel,
    Input,
    PopoverArrow,
    useDisclosure,
    PopoverHeader,
    PopoverBody,
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalCloseButton, 
    Button

} from '@chakra-ui/react';
import React, { useState } from 'react';
import Avatar from 'react-avatar';

import { useColorMode } from '@chakra-ui/react';


const ClientsTable = ({ clients }) => {
    // Avatar colors
    const colors = ['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B'];
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()

  
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        salesPerson: '',
        status: ''
      });
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value
        });
      };

    const getColorIndex = (name) => {
        const charCodeSum = name
            .split('')
            .map((char) => char.charCodeAt())
            .reduce((sum, code) => sum + code, 0);
        return charCodeSum % colors.length;
    };
    console.log(clients)
    return (
        <div style={{margin: '0 150px'}}>
            <TableContainer>
                <Table variant='simple'>
                <Thead >
                    <Tr>
                        <Th>Client</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Status</Th>
                        <Th>Details</Th>
                    </Tr>
                </Thead>
                    <Tbody>
                        {clients.map(client => (
                        <Tr key={client.id} style={{  fontSize: '16px'}}>
                            <Td >
                                <Avatar
                                    name={`${client.first_name} ${client.last_name}`}
                                    size="30"
                                    round={true}
                                    style={{ marginRight: '5px' }}
                                    color={colors[getColorIndex(`${client.first_name} ${client.last_name}`)]}
                                />  {client.first_name} {client.last_name}</Td>
                            <Td>{client.email}</Td>
                            <Td>{client.phone_number}</Td>
                            <Td
                                
                                    variant='solid' 
                                    style={{ 
                                        padding:'10px 20px',
                                        width:'90px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        color: client.status === 'Inactive' ? '#F14C41' : 'green', 
                                    }}                            >
                                    {client.status}
                            </Td>
                            <Td>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button style={{color:'#7E8299', padding:'10px 40px'}}>View</Button>
                                    </PopoverTrigger>
                                    <PopoverContent style={{  width: '125px' }}>
                                        <PopoverArrow />
                                        <PopoverHeader>  
                                            <span style={{cursor: 'pointer'}} onClick={onOpen}>Edit</span>
                                        </PopoverHeader>
                                        <PopoverBody>                                   
                                            <span style={{cursor: 'pointer'}}>Delete</span>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Td>
                        </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default ClientsTable;
