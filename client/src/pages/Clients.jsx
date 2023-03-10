import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Tfoot,
    Wrap,
    WrapItem,
    Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CLIENTS_BY_SALESPERSON } from '@utils/queries';
import ClientsTable from '@components/Clients/ClientsTable';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '@utils/auth';

const Clients = () => {
    const profileId = Auth.getProfile().data._id;
    const { loading, error, data } = useQuery(CLIENTS_BY_SALESPERSON, {
        variables: {
            salespersonId: profileId,
        },
    });

    const clients = data ? [...data.clientsBySalesperson] : [];

    return (
        <Flex>
            {loading ? (
                <div></div>
            ) : (
                <ClientsTable clients={clients} />
            )}
        </Flex>
    );
};
export default Clients;
