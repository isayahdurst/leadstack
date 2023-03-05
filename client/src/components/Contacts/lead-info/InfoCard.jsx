import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
const InfoCard = ({ selectedClient }) => {
    return (
        <Card>
            <CardHeader>
                <Heading>Lead Information:</Heading>
            </CardHeader>
            <CardBody>
                {selectedClient ? (
                    <div>
                        <Text>
                            Name: {selectedClient.first_name}{' '}
                            {selectedClient.last_name}
                        </Text>
                        <Text>Phone: {selectedClient.phone_number}</Text>
                        <Text>Email: {selectedClient.email}</Text>
                    </div>
                ) : (
                    <Text>Select a client to see their info.</Text>
                )}
            </CardBody>
        </Card>
    );
};

export default InfoCard;
