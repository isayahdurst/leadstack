import {
    Wrap,
    WrapItem,
    Center
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ClientsModule from '@components/Dashboard/Clients/ClientsModule';



const Dashboard = () => {
    return (
            <Wrap spacing='30px' justify='center'>
                <WrapItem>
                    <ClientsModule />
                </WrapItem>
                <WrapItem>
                    <Center w='400px' h='80px' bg='green.200'>
                    Component 2
                    </Center>
                </WrapItem>
                <WrapItem>
                    <Center w='400px' h='80px' bg='tomato'>
                    Component 3
                    </Center>
                </WrapItem>
            </Wrap>
    );
};
export default Dashboard;
