import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
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
import { useMutation } from '@apollo/client';
import { SEND_EMAIL } from '@utils/mutations';

const EmailEditor = ({ setShowEditor }) => {
    const editorRef = useRef(null);

    const [sendEmail] = useMutation(SEND_EMAIL);
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState('Enter Subject Here');
    const toast = useToast();

    const onSubmitHandler = async () => {
        setLoading(true);
        try {
            const data = await sendEmail({
                variables: {
                    from: 'leadstackucb@gmail.com',
                    to: 'durstisayah@gmail.com',
                    subject: subject,
                    text: editorRef.current.getContent({ format: 'text' }),
                    html: editorRef.current.getContent(),
                    auth: {
                        user: 'leadstackucb@gmail.com',
                        pass: 'jolqrikqvczhaajj',
                    },
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
        setLoading(false);
    };

    return (
        <>
            <FormControl id='email'>
                <FormLabel>To:</FormLabel>
                <Editable defaultValue='durstisayah@gmail.com'>
                    <EditablePreview />
                    <Input p={2} as={EditableInput} />
                </Editable>
            </FormControl>

            <FormControl id='subject'>
                <FormLabel>Subject:</FormLabel>
                <Editable
                    isPreviewFocusable={true}
                    selectAllOnFocus={true}
                    defaultValue={subject}>
                    <EditablePreview />
                    <Input
                        p={2}
                        as={EditableInput}
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                    />
                </Editable>
            </FormControl>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{ height: 500 }}
                apiKey={'fjsg14k79ghooz3jwbx4w135tv28rcx0uxw0r0nizqsqspmz'}
            />
            <Button
                colorScheme={'green'}
                onClick={onSubmitHandler}
                isLoading={loading}>
                Send
            </Button>
            <Button colorScheme={'red'} onClick={() => setShowEditor(false)}>
                Cancel
            </Button>
        </>
    );
};

export default EmailEditor;
