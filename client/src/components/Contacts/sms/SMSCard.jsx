import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

const SMSCard = () => {
    const color = useColorModeValue('gray.100', 'gray.700');
    return (
        <Card
            height={'100%'}
            flexGrow={1}
            bg={color}
            flexShrink={0}
            flexBasis={'40%'}>
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
