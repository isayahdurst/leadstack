import {
    Wrap,
    WrapItem,
    Center
} from '@chakra-ui/react';
import React from 'react';
import ClientsModule from '@components/Dashboard/Clients/ClientsModule';
import ClientsEmail from '@components/Dashboard/Clients/ClientsEmail';
import ClientsSms from '@components/Dashboard/Clients/ClientsSMS';
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
      <Wrap spacing='30px' justify='center'>
        <WrapItem>
            <ClientsModule />
        </WrapItem>
        <WrapItem >
            <ClientsEmail salespersonId= {profileId} />
        </WrapItem>
       
      </Wrap>
    );
  };
export default Dashboard;
