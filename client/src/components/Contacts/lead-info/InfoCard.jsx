import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
const InfoCard = () => {
    return (
        <Card>
            <CardHeader>
                <Heading>Lead Information:</Heading>
            </CardHeader>
            <CardBody>
                <Text>Conversations</Text>
            </CardBody>
        </Card>
    );
};

export default InfoCard;
