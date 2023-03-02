import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react';
const EmailCard = () => {
    return (
        <Card height={'100%'} flexGrow={1}>
            <CardHeader>
                <Heading>Email:</Heading>
            </CardHeader>
            <CardBody>
                <Text>Conversations</Text>
            </CardBody>
        </Card>
    );
};

export default EmailCard;
