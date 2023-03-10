import { useQuery } from '@apollo/client';
import {
    Box,
    Card,
    CardBody,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Flex,
    Center,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { SALESPERSON_EMAILS } from '../../../utils/queries';
import formatDate from '../../../utils/dateFormat';

const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }

const ClientsEmail = ({ salespersonId }) => {
    const { loading, error, data } = useQuery(SALESPERSON_EMAILS, {
        variables: { salespersonId: salespersonId },
    });
    const [showAllEmails, setShowAllEmails] = useState(false);

    const allClientEmails = data?.allSalespersonEmails || [];

    const toggleShowAllEmails = () => {
        setShowAllEmails(!showAllEmails);
    };

    const toggleShowFirstEmails = () => {
        setShowAllEmails(false);
    };

    console.log(allClientEmails);
    // console.log(data)

    return (
        <Center maxH='600px'>
            <Card mt={10} mb={5}>
                <CardBody>
                    <Box>
                        <Table variant='simple'/* style={{ width: '800px' }}*/>
                            <Thead>
                                <Tr>
                                    <Th>Client</Th>
                                    <Th>Subject</Th>
                                    <Th>Date</Th>
                                </Tr>
                            </Thead>
                            {allClientEmails.length === 0 ? (
                                <Tr>
                                    <Td colSpan='3' textAlign='center'>
                                        No emails to show
                                    </Td>
                                </Tr>
                            ) : showAllEmails ? (
                                allClientEmails.map((email) => (
                                    <Tr key={email._id}>
                                        <Td>
                                            {email.client.first_name}{' '}
                                            {email.client.last_name}
                                        </Td>
                                        <Td>
                                            {email.subject.length > 50
                                                ? email.subject.substring(
                                                      0,
                                                      50
                                                  ) + '...'
                                                : email.subject}
                                        </Td>
                                        <Td>{formatDate(email.date)}</Td>
                                    </Tr>
                                ))
                            ) : (
                                allClientEmails.slice(0, 5).map((email) => (
                                    <Tr key={email._id}>
                                        <Td>
                                            {email.client.first_name}{' '}
                                            {email.client.last_name}
                                        </Td>
                                        <Td>
                                            {email.subject.length > 50
                                                ? email.subject.substring(
                                                      0,
                                                      50
                                                  ) + '...'
                                                : email.subject}
                                        </Td>
                                        <Td>{formatDate(email.date)}</Td>
                                    </Tr>
                                ))
                            )}
                        </Table>
                    </Box>
                    <Flex justifyContent='flex-start'>
                        {!showAllEmails && allClientEmails.length > 5 && (
                            <Button
                                colorScheme='teal'
                                variant='outline'
                                mt='4'
                                onClick={toggleShowAllEmails}>
                                View all email
                            </Button>
                        )}
                        {showAllEmails && (
                            <Button
                                colorScheme='teal'
                                variant='outline'
                                mt='4'
                                ml='2'
                                onClick={toggleShowFirstEmails}>
                                Close
                            </Button>
                        )}
                    </Flex>
                </CardBody>
            </Card>
        </Center>
    );
};

export default ClientsEmail;
