import {
    Wrap,
    WrapItem,
    Center,
    Box,
    Flex
} from '@chakra-ui/react';
import React from 'react';
import ClientsModule from '@components/Dashboard/Clients/ClientsModule';
import ClientsEmail from '@components/Dashboard/Clients/ClientsEmail';
import ClientsSMS from '@components/Dashboard/Clients/ClientsSMS';
import { useQuery, useMutation } from '@apollo/client';
import { CLIENTS_BY_SALESPERSON } from '@utils/queries';

import Auth from '@utils/auth';

const Dashboard = () => {
    const profileId = Auth.getProfile().data._id;
    const { loading, error, data } = useQuery(CLIENTS_BY_SALESPERSON, {
        variables: {
            salespersonId: profileId,
        },
    });

    const clients = data?.clientsBySalesperson || [];

return (
    <Flex spacing='30px' justify='space-between' wrap='wrap' gap='2' m='50px'>
        <Box w={[300, 400, 500]} h='350px'>
            <ClientsModule />
        </Box>
        <Box>
            <ClientsEmail salespersonId= {profileId} />
        </Box>
    </Flex>
    );
  };
export default Dashboard;
