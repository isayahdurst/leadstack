import {
    Box,
    Card,
    Center,
    Stack,
    Heading,
    CardHeader,
    CardBody,
    StackDivider,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    FormControl,
    FormLabel,
    Input
    
} from '@chakra-ui/react';

import { CLIENT_SMS } from '../../../utils/queries';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

const ClientsSMS = () => {

     const clientId = '640a26efd9cf5305fa926aa7'
     const { loading, error, data } = useQuery(CLIENT_SMS, {
        variables: { clientId },
    });
    const allClientSms = data?.allClientSms  || [];
    console.log(allClientSms)
    return (
        <div>
        {allClientSms.map((sms) => (
          <div key={sms._id}>
            <p>Body: {sms.body}</p>
            <p>Date: {sms.date}</p>
            <p>Received: {sms.received}</p>
          </div>
        ))}
      </div>
    );

};
export default ClientsSMS;
