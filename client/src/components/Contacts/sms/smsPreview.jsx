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
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { CLIENT_SMS } from '../../../utils/queries';
import { gql } from 'graphql-tag';

function renderSMS(props) {
  const { clientId } = props;
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
                <p>{sms.message}</p>
                <p>
                    Sent by {sms.sales_person.first_name} {sms.sales_person.last_name}{' '}
                    on {new Date(sms.sent_at).toLocaleDateString()}
                </p>
                </ListItem>
            ))}
            </List>
        </CardBody>
    </Card>
  );
}

export default renderSMS;