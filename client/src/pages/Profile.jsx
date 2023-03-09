import {
    Heading,
    Avatar,
    Box,
    Text,
    Button,
    VStack,
    HStack,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    
} from '@chakra-ui/react';

import { PROFILE_QUERY } from './../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import Login from '@components/Login/Login';
import Signup from '@components/Signup/Signup';
import { createContext, useContext } from 'react'
import EditProfile from '@components/EditProfile/EditProfile'
//import AuthContext from '@contexts/AuthContext';


//export const ProfileContext = createContext(Auth.getProfile());

const Profile = (props) => {
    /*const { loading, error, data } = useQuery(PROFILE_QUERY, {
        variables: { id: props.id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error.message);
        return <p>Error :(</p>;
    }
    if (!data || !data.salespersonById || data.salespersonById.length === 0)
        return <p>No user found</p>;

    const user = data.salespersonById[0];
    const initials =
        user.first_name.substring(0, 1) + user.last_name.substring(0, 1);
    

    const { profile } = useContext(AuthContext);

        console.log(profile);
    */
    return (
        <Box p={6}>
            {Auth.loggedIn() ? (
                <>
                    <Tabs>
                        <TabList>
                            <Tab>Personal Information</Tab>
                            <Tab>Configure Email Signature</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <HStack>
                                    <Avatar
                                        src='/defaultAvatar.jpg'
                                        size='lg'
                                        alt='avatar image'>
                                    </Avatar>
                                    <VStack align='left'>
                                        <Heading fontSize='xl' pl={10} pt={4}>
                                            {Auth.getProfile().data.first_name} {Auth.getProfile().data.last_name}
                                        </Heading>
                                        <Text pl={10}>
                                            Phone number: {Auth.getProfile().data.phone_number}
                                        </Text>
                                        <Text pl={10}>Email: {Auth.getProfile().data.email}</Text>
                                    </VStack>
                                </HStack>
                                <Box pt={10}>
                                <EditProfile />
                                </Box>
                            </TabPanel>
                            <TabPanel>
                                <Button>Add Signature</Button>
                                <Box>
                                    Functionality with email signature will de added
                                    soon...
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </>
            ) : (
                <>
                <div>
                    Please log in or sign up to view this page:
                    <Login />
                    <Signup />
                </div>
                    
                </>      
            )}
            
            
        </Box>
    );
};

export default Profile;

