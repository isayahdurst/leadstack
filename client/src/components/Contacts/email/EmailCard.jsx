import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    HStack,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import EmailIntegrationMenu from './EmailIntegrationMenu';
import EmailPreview from './EmailPreview';

const EmailCard = () => {
    const color = useColorModeValue('gray.100', 'gray.700');
    return (
        <Card height={'100%'} flexGrow={1} flexBasis={'60%'} bg={color}>
            <CardHeader>
                <HStack>
                    <Heading size={'lg'}>Email:</Heading>
                    <EmailIntegrationMenu />
                </HStack>
            </CardHeader>
            <CardBody overflowY={'scroll'} marginBottom={5}>
                <Flex height={'100%'} flexDirection={'column'} gap={2}>
                    <EmailPreview />
                    <EmailPreview />
                    <EmailPreview />
                    <EmailPreview />
                </Flex>
            </CardBody>
        </Card>
    );
};

export default EmailCard;
