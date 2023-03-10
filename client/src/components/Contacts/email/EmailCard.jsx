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
import { useMutation, useQuery } from '@apollo/client';
import { SEND_EMAIL } from '@utils/mutations';
import { useState, useContext, useEffect } from 'react';
import EmailEditor from './emailEditor/EmailEditor';
import { CLIENT_EMAILS } from '@utils/queries';
import { LeadContext } from '@contexts/LeadContext';

const EmailCard = ({ selectedLead }) => {
    const color = useColorModeValue('gray.100', 'gray.700');

    const [sendEmail] = useMutation(SEND_EMAIL);
    const [loading, setLoading] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    const { lead } = useContext(LeadContext);

    const {
        data,
        loading: loadingEmails,
        refetch,
    } = useQuery(CLIENT_EMAILS, {
        variables: { clientId: lead._id },
    });

    useEffect(() => {
        refetch();
    }, [lead]);

    const clientEmails = data?.allClientEmails || [];
    console.log(data);

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
                    {!clientEmails.length && 'No emails to this client'}
                    {!showEditor &&
                        clientEmails.map((email) => (
                            <EmailPreview key={email._id} {...email} />
                        ))}

                    {showEditor && (
                        <EmailEditor setShowEditor={setShowEditor} />
                    )}
                </Flex>
            </CardBody>
            <CardFooter>
                {!showEditor && (
                    <Button
                        onClick={() => setShowEditor(!showEditor)}
                        colorScheme={'red'} 
                        variant={'outline'}
                        isLoading={loading}>
                        New Email
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default EmailCard;
