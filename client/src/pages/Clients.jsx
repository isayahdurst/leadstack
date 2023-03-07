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
    WrapItem
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CLIENTS } from '../utils/queries';
import ClientsTable from '@components/Clients/ClientsTable';
import { useQuery, useMutation } from '@apollo/client';



const Clients = () => {
    const { loading, data } = useQuery(CLIENTS);
    const clients = data?.clients || [];

    return (
		<div>
			{loading ? (
                        <div>Loading...</div>
                        ) : (
                        <ClientsTable
                        	clients={clients}
                        />
                    )}
		</div>
    );
};
export default Clients;
