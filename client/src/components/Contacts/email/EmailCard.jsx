import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    HStack,
    Flex,
    useColorModeValue,
    Button,
    Box,
    CardFooter,
} from '@chakra-ui/react';
import EmailIntegrationMenu from './EmailIntegrationMenu';
import EmailPreview from './EmailPreview';
import { useMutation } from '@apollo/client';
import { SEND_EMAIL } from '@utils/mutations';
import { useState } from 'react';
import EmailEditor from './emailEditor/EmailEditor';

const EmailCard = ({ selectedLead }) => {
    const color = useColorModeValue('gray.100', 'gray.700');

    const [sendEmail] = useMutation(SEND_EMAIL);
    const [loading, setLoading] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    const handleSendEmail = async () => {
        setLoading(true);
        try {
            const data = await sendEmail({
                variables: {
                    from: 'leadstackucb@gmail.com',
                    to: selectedLead.email,
                    subject: 'Hello from LeadStack!',
                    text: 'This is a test.',
                    auth: {
                        user: 'leadstackucb@gmail.com',
                        pass: 'jolqrikqvczhaajj',
                    },
                },
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

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
                    {!showEditor && <EmailPreview />}

                    {showEditor && (
                        <EmailEditor setShowEditor={setShowEditor} />
                    )}
                </Flex>
            </CardBody>
            <CardFooter>
                {!showEditor && (
                    <Button
                        onClick={() => setShowEditor(!showEditor)}
                        isLoading={loading}>
                        New Email
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default EmailCard;
