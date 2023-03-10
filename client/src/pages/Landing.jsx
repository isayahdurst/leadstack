import {
    Box,
    Button,
    Heading,
    Img,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  
const Landing = () => {
    return (
        <Box as="section" bg={mode('gray.50', 'gray.800')} pt="16" pb="24"  h="100vh">
            <Box
            maxW={{
                base: 'xl',
                md: '7xl',
            }}
            mx="auto"
            px={{
                base: '6',
                md: '8',
            }}
            >
            <Stack
                direction={{
                base: 'column',
                lg: 'row',
                }}
                spacing={{
                base: '3rem',
                lg: '2rem',
                }}
                mt="8"
                align={{
                lg: 'center',
                }}
                justify="space-between"
            >
                <Box
                flex="1"
                maxW={{
                    lg: '520px',
                }}
                >
            
                <Heading
                    as="h1"
                    size="3xl"
                    color={mode('gray.700', 'gray.300')}
                    mt="8"
					mb='8'
                    fontWeight="extrabold"
                    letterSpacing="tight"
                >
                    Connect and engage with your <span style={{color: '#3182ce'}}>customers everywhere</span>
                </Heading>
                <Text color={mode('gray.600', 'gray.400')} mt="4" fontSize="lg" fontWeight="medium">
					More channels, more customers with Twilio/Nodemail integration. Communicate with potential customers across multiple channels and streamline your lead generation process.
                </Text>
                <Stack
                    direction={{
                    base: 'column',
                    md: 'row',
                    }}
                    spacing="4"
                    mt="8"
                >
                
                </Stack>
                
                </Box>
                <Box
                pos="relative"
                w={{
                    base: 'full',
                    lg: '560px',
                }}
                h={{
                    base: 'auto',
                    lg: '560px',
                }}
                >
                <Img
                    w="full"
                    pos="relative"
                    zIndex="1"
                    h={{
                    lg: '100%',
                    }}
                    objectFit="cover"
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhZHklMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                    alt="Screening talent"
                />
                <Box
                    pos="absolute"
                    w="100%"
                    h="100%"
                    top="-4"
                    left="-4"
                    bg={mode('gray.200', 'gray.700')}
                />
                </Box>
            </Stack>
            </Box>
        </Box>
        )
}

export default Landing;