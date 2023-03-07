import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
const InfoCard = ({ selectedClient }) => {
    const color = useColorModeValue('gray.100', 'gray.700');
    return (
        <Card bg={color}>
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
