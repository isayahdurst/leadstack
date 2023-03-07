import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Box
} from '@chakra-ui/react'
import { useRef } from 'react'

function SignupConfirmation(confirmation) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = useRef();
    const btnRef = useRef();

    if(confirmation === true){
        onOpen();
    }
    

    return (
        <>
          <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Sign up
          </Button>
          <Drawer
                isOpen={isOpen}
                placement='top'
                onClose={onClose}
                initialFocusRef={firstField}
                finalFocusRef={btnRef}
                size='xl'
          >
            <DrawerOverlay />
                <DrawerCloseButton />
                <DrawerContent>
                    <DrawerHeader className='hidden'>
                        Thanks for signing up! You can now use all of the features available on the LeadStack.
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button className='hidden' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
          </Drawer>
        </>
      )
}

export default SignupConfirmation;
