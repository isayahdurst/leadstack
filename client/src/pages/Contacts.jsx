import {
    Box,
    Flex,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Text,
    Heading,
    Button,
} from '@chakra-ui/react';
import { useState } from 'react'

import InfoCard from '@components/Contacts/lead-info/InfoCard';
import EmailCard from '@components/Contacts/email/EmailCard';
import SMSCard from '@components/Contacts/sms/SMSCard';
import Clients from '@components/Contacts/clients/Clients';

const Contacts = () => {
    const [selectedClient, setSelectedClient] = useState(null);

    return (
        <Flex px={10} height={'90vh'}>
            <Flex
                height={'100%'}
                justifyContent={'space-between'}
                gap={5}
                flexGrow={1}>
                <Card height={'100%'} width={'20rem'}>
                    <CardHeader>
                        <Heading>Contacts</Heading>
                    </CardHeader>
                    <CardBody>
                        <Clients selectedClient={selectedClient} setSelectedClient={setSelectedClient}/>
                    </CardBody>
                </Card>
                <Flex flexGrow={1} flexDirection={'column'} gap={5}>
                    <InfoCard selectedClient={selectedClient} />
                    <Flex flexGrow={1} gap={5}>
                        <EmailCard />
                        <SMSCard />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Contacts;
