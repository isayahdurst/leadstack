import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState, useContext, useEffect } from 'react';
import {
    Button,
    useToast,
    Editable,
    EditableInput,
    EditablePreview,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_EMAIL, ADD_EMAIL } from '@utils/mutations';
import { LeadContext } from '@contexts/LeadContext';
import { PROFILE_QUERY } from '@utils/queries';
import Auth from '@utils/auth';

const EmailEditor = ({ setShowEditor }) => {
    const { lead } = useContext(LeadContext);
    const editorRef = useRef(null);

    const [sendEmail] = useMutation(SEND_EMAIL);
    const [addEmail] = useMutation(ADD_EMAIL);
    const [sending, setSending] = useState(false);
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const salesID = Auth.getProfile().data._id;

    useEffect(() => {
        if (lead.email) {
            setEmail(lead.email);
        }
    }, [lead]);

    const toast = useToast();

    // Get sales profile data

    const { loading, error, data } = useQuery(PROFILE_QUERY, {
        variables: { id: salesID },
    });

    const salesProfile = data?.salespersonById[0];
    console.log(typeof new Date().toString());

    const onSubmitHandler = async () => {
        setSending(true);
        try {
            const data = await sendEmail({
                variables: {
                    from: salesProfile.google_email,
                    to: email,
                    subject: subject,
                    text: editorRef.current.getContent({ format: 'text' }),
                    html: editorRef.current.getContent(),
                    auth: {
                        user: salesProfile.google_email,
                        pass: salesProfile.google_password,
                    },
                },
            });

            // TODO: Add email to database.
            // removed for now because it's not working

            const emailData = await addEmail({
                variables: {
                    subject: subject,
                    text: editorRef.current.getContent({ format: 'text' }),
                    date: new Date().toString(),
                    sales_person: salesProfile._id,
                    client: lead._id,
                },
            });
            toast({
                title: 'Success!',
                description: 'Email sent successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error!',
                description: 'There was an error sending the email.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            });
        }
        setSending(false);
    };

    return (
        <>
            <FormControl id='email'>
                <FormLabel>To:</FormLabel>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='subject'>
                <FormLabel>Subject:</FormLabel>
                <Input
                    p={2}
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    placeholder='Enter subject here'
                />
            </FormControl>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{ height: 500 }}
                apiKey={'fjsg14k79ghooz3jwbx4w135tv28rcx0uxw0r0nizqsqspmz'}
            />
            <Button
                colorScheme={'green'}
                onClick={onSubmitHandler}
                isLoading={sending}
                isDisabled={
                    !salesProfile?.google_email &&
                    !salesProfile?.google_password
                }>
                Send
            </Button>
            <Button colorScheme={'red'} onClick={() => setShowEditor(false)}>
                Cancel
            </Button>
        </>
    );
};

export default EmailEditor;
