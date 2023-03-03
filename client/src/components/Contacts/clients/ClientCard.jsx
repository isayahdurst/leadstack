import {
    Box,
    Text,
    List,
    ListItem,
    ListIcon,
    useColorModeValue,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';

const ClientCard = ({ key, name, phone, email }) => {
    return (
        <Box
            maxW={'20rem'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
            mb={2}>
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={4} py={4}>
                <List spacing={3}>
                    <ListItem>
                        <Text as='b'>{name}</Text>
                    </ListItem>
                    <ListItem>
                        <ListIcon as={PhoneIcon} color='red.400' />
                        {phone}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={EmailIcon} color='red.400' />
                        {email}
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default ClientCard;
