import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    HStack,
    Text,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

import { useState } from 'react';

const EmailTutorialModal = ({ isOpen, onOpen, onClose }) => {
    const [step, setStep] = useState(0);

    const closeModalHandler = () => {
        setStep(0);
        onClose();
    };

    return (
        <>
            <Modal onClose={closeModalHandler} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Step {step + 1} of 3 -{' '}
                        {step === 0 && 'Select Email Provider'}
                        {step === 1 && 'Generate App Password'}
                        {step === 2 && 'Generate App Password'}:
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {step === 0 && (
                            <StepOne step={step} setStep={setStep} />
                        )}
                        {step === 1 && (
                            <StepTwo step={step} setStep={setStep} />
                        )}
                        {step === 2 && <StepThree />}
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            {step > 0 && (
                                <Button onClick={() => setStep(step - 1)}>
                                    Back
                                </Button>
                            )}
                            <Button
                                onClick={closeModalHandler}
                                colorScheme={'red'}>
                                Cancel
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EmailTutorialModal;
