import { ButtonGroup, Container, IconButton, Stack, Text } from '@chakra-ui/react'

const Landing = () => {
    return (
        <Container
        as="footer"
        role="contentinfo"
        py={{ base: '12', md: '16' }}
        maxW='100%'
        style={{ borderTop:'1px solid black'}}
    >
        <Stack spacing={{ base: '4', md: '5' }}>
            <Stack justify="space-between" direction="row" align="center">
                {/* <Logo /> */}
                <ButtonGroup variant="ghost">
               
                </ButtonGroup>
            </Stack>
            <Text fontSize="sm" color="subtle">
                &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights reserved.
            </Text>
        </Stack>
    </Container>
    
    )
}

export default Landing;