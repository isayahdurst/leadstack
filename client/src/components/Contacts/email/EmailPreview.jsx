import {
    CardFooter,
    Card,
    CardHeader,
    CardBody,
    Text,
    Heading,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

const EmailPreview = ({ subject, text, date }) => {
    return (
        <Card bg={useColorModeValue('gray.50', 'gray.800')}>
            <CardHeader>
                <Text>
                    <b>Subject: </b>
                    <i>{subject}</i>
                </Text>
            </CardHeader>
            <CardBody>
                <Text>
                    <b>Body: </b>
                    <i>{text}</i>
                </Text>
            </CardBody>
            <CardFooter>
                <Text>
                    <i>{date}</i>
                </Text>
            </CardFooter>
        </Card>
    );
};

export default EmailPreview;
