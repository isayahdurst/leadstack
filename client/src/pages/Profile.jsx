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
import { useContext, useEffect } from 'react'
import EditProfile from '@components/EditProfile/EditProfile'
import {AuthContext} from '@contexts/AuthContext';






const Profile = (props) => {
    
    const { updateProfileData, profileData} = useContext(AuthContext);

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
                                            {profileData.first_name} {profileData.last_name}
                                        </Heading>
                                        <Text pl={10}>
                                            Phone number: {profileData.phone_number}
                                        </Text>
                                        <Text pl={10}>Email: {profileData.email}</Text>
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

