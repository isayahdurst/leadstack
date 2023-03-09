import {
    CardFooter,
    Card,
    CardHeader,
    CardBody,
    Text,
    Heading,
    Button,
    useColorModeValue,
    List,
    ListItem
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { CLIENT_SMS } from '../../../utils/queries';
import { gql } from 'graphql-tag';

function RenderSMS({clientId}) {
  console.log(clientId);
  const { loading, error, data } = useQuery(CLIENT_SMS, {
    variables: { clientId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data.allClientSms.length) {
    return <p>No SMS found for this client</p>;
  }

  return (
    <Card>
        <CardBody>
            <List>
            {data.allClientSms.map((sms) => (
                <ListItem key={sms._id}>
                <p>{sms.body}</p>
                <p>on: {new Date(Number(sms.date)).toLocaleDateString()}</p>
                </ListItem>
            ))}
            </List>
        </CardBody>
    </Card>
  );
}

export default RenderSMS;