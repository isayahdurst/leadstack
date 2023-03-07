import { Stack, Text, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SALESPERSON } from '@utils/mutations';
import Auth from '@utils/auth';

const StepFour = () => {
    const [email, setEmail] = useState('');
    const [updateSalesperson] = useMutation(UPDATE_SALESPERSON);

    const updateEmail = async () => {
        const { _id } = Auth.getProfile().data;
        await updateSalesperson({
            variables: {
                salespersonId: _id,
                googleEmail: email,
            },
        });
    };
    return (
        <Stack>
            <Text>Add the Email Address for this account:</Text>
            <Input
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={() => updateEmail()}>Submit</Button>
        </Stack>
    );
};

export default StepFour;
