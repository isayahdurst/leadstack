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

import InfoCard from '@components/Contacts/lead-info/InfoCard';
import EmailCard from '@components/Contacts/email/EmailCard';
import SMSCard from '@components/Contacts/sms/SMSCard';
import Clients from '@components/Contacts/clients/Clients'

const Contacts = () => {
    return (
        <Box px={10} height={'90vh'}>
            <Flex height={'100%'} justifyContent={'space-between'} gap={5}>
                <Card height={'100%'} width={'20rem'}>
                    <CardHeader>
                        <Heading>Contacts</Heading>
                    </CardHeader>
                    <CardBody>
                        <Clients />
                    </CardBody>
                </Card>
                <Flex flexGrow={1} flexDirection={'column'} gap={5}>
                    <InfoCard />
                    <Flex flexGrow={1} gap={5}>
                        <EmailCard />
                        <SMSCard />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Contacts;
