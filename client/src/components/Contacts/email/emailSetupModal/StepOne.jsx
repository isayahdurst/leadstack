import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Text,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';

const StepOne = ({ step, setStep }) => {
    return (
        <Stack>
            <Button onClick={() => setStep(step + 1)}>
                <Text
                    color={useColorModeValue('blue.500', 'blue.300')}
                    fontSize={'lg'}>
                    G
                </Text>
                <Text
                    color={useColorModeValue('red.500', 'red.300')}
                    fontSize={'lg'}>
                    o
                </Text>
                <Text
                    color={useColorModeValue('yellow.400', 'yellow.300')}
                    fontSize={'lg'}>
                    o
                </Text>
                <Text
                    color={useColorModeValue('blue.500', 'blue.300')}
                    fontSize={'lg'}>
                    g
                </Text>
                <Text
                    color={useColorModeValue('green.500', 'green.300')}
                    fontSize={'lg'}>
                    l
                </Text>
                <Text
                    color={useColorModeValue('red.500', 'red.300')}
                    fontSize={'lg'}>
                    e
                </Text>
            </Button>
            <Button isDisabled>Outlook</Button>
        </Stack>
    );
};

export default StepOne;
