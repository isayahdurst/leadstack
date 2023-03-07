import { Text, Input, Button, Center } from '@chakra-ui/react';
const StepTwo = ({ step, setStep }) => {
    return (
        <>
            <Text marginBottom={2}>
                To connect your email account, you will need to generate an app
                password. This is a password that is unique to your account and
                is used to access your email account from a third-party
                application. This is a security measure to prevent unauthorized
                access to your email account.
            </Text>
            <Center>
                <Button
                    variant={'outline'}
                    colorScheme={'green'}
                    onClick={() => setStep(step + 1)}>
                    Show me How
                </Button>
            </Center>
        </>
    );
};

export default StepTwo;
