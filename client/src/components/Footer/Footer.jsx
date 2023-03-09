import { 
    ButtonGroup, 
    Container, 
    IconButton, 
    Stack, 
    Text, 
    Button, 
    HStack,
    Link
} from '@chakra-ui/react'

const Landing = () => {
    return (
        <div className='footerContainer'>
            
                {/* <Logo /> */}
                    <HStack pr='20px' spacing='0px'>
                        <Text fontSize="lg" fontWeight='bold' color='subtle'>
                            Lead
                        </Text>
                        <Text fontSize="lg" color='red' fontWeight='bold'>
                            Stack
                        </Text>
                    </HStack>
                
                
                    <Link style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer noopener" href='https://github.com/lunchtimewhee'><Button variant="ghost" size='sm' >Anthony Li</Button></Link>

                    <Link style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer noopener" href='https://github.com/elangworth'><Button variant="ghost" size='sm' >Emily Langworth</Button></Link>

                    <Link style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer noopener" href='https://github.com/frankmng'><Button variant="ghost" size='sm' >Frank Nguyen</Button></Link>

                    <Link style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer noopener" href='https://github.com/isayahdurst'><Button variant="ghost" size='sm' >Isayah Durst</Button></Link>

                    <Link style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer noopener" href='https://github.com/OlgaGav'><Button variant="ghost" size='sm' >Olga Gavrushenko</Button></Link>
                
            
            
    </div>
    
    )
}

export default Landing;