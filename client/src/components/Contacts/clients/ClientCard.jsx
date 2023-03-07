import {
    Box,
    Text,
    List,
    ListItem,
    ListIcon,
    useColorModeValue,
    ScaleFade,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';

const ClientCard = ({ name, phone, email, selected, onClick }) => {
    const className = `client-card${selected ? ' active' : ''}`;

    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Box
                maxW={'20rem'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={useColorModeValue('md', 0)}
                rounded={'md'}
                overflow={'hidden'}
                mb={2}
                className={className}
                onClick={onClick}>
                <Box
                    bg={useColorModeValue('gray.50', 'gray.900')}
                    px={4}
                    py={4}
                    // TODO: Border can be added to toggle "Active" lead.
                    /* border={'2px'}
                    borderColor={'red.300'}
                    borderRadius={6} */
                >
                    <List spacing={3}>
                        <ListItem key={name}>
                            <Text as='b'>{name}</Text>
                        </ListItem>
                        <ListItem key={phone}>
                            <ListIcon as={PhoneIcon} color='red.400' />
                            {phone}
                        </ListItem>
                        <ListItem key={email}>
                            <ListIcon as={EmailIcon} color='red.400' />
                            {email}
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </ScaleFade>
    );
};

export default ClientCard;
