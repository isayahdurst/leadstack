import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
const InfoCard = () => {
    const color = useColorModeValue('gray.100', 'gray.700');
    return (
        <Card bg={color}>
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
