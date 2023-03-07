import {
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Center,
    Stack,
} from '@chakra-ui/react';

import { useState } from 'react';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import Auth from '@utils/auth';
import { useMutation } from '@apollo/client';
import { UPDATE_SALESPERSON } from '@utils/mutations';

const StepThree = () => {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');
    const [updateSalesperson] = useMutation(UPDATE_SALESPERSON);

    /* const addGooglePassword = async () => {
        const { _id } = Auth.getProfile().data;
        const sp = await updateSalesperson({
            variables: {
                salespersonId: _id,
                googlePassword: password,
            },
        });
        console.log(Auth.getProfile());
    }; */
    return (
        <>
            <Stack marginBottom={5}>
                <Text>
                    <b>Step 1:</b> Navigate to Google {'>'} Account {'>'}{' '}
                    Security {'>'} App Passwords
                </Text>
                <Text>
                    <b>Step 2:</b> Select the Mail App and choose "Other" for
                    device.
                </Text>
                <Text>
                    <b>Step 3:</b> Click Generate and copy the password.
                </Text>
                <Text>
                    <b>Step 4:</b> Paste the password into the input below and
                    click "Save".
                </Text>
            </Stack>
            <InputGroup>
                <Input
                    placeholder='App Password'
                    type={show ? '' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                    <i
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShow(!show)}>
                        {!show && <FiEye />}
                        {show && <FiEyeOff />}
                    </i>
                </InputRightElement>
            </InputGroup>
            <Center marginTop={5}>
                <Button
                    colorScheme={'green'}
                    isDisabled={password.length !== 16}>
                    Save
                </Button>
            </Center>
        </>
    );
};

export default StepThree;
