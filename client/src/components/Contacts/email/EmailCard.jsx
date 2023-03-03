import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    HStack,
    Flex,
} from '@chakra-ui/react';
import EmailIntegrationMenu from './EmailIntegrationMenu';

const EmailCard = () => {
    return (
        <Card height={'100%'} flexGrow={1}>
            <CardHeader>
                <HStack>
                    <Heading size={'lg'}>Email:</Heading>
                    <EmailIntegrationMenu />
                </HStack>
            </CardHeader>
            <CardBody>
                <Flex height={'100%'}></Flex>
            </CardBody>
        </Card>
    );
};

export default EmailCard;
