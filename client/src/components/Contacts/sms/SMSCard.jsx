import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react';

const SMSCard = () => {
    return (
        <Card height={'100%'} flexGrow={1}>
            <CardHeader>
                <Heading>SMS</Heading>
            </CardHeader>
            <CardBody>
                <Text>Conversations</Text>
            </CardBody>
        </Card>
    );
};

export default SMSCard;
