import {
    CardFooter,
    Card,
    CardHeader,
    CardBody,
    Text,
    Heading,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

const EmailPreview = () => {
    return (
        <Card bg={useColorModeValue('gray.50', 'gray.800')}>
            <CardHeader>
                <Text>
                    <b>Subject: </b>
                    <i>Test Email</i>
                </Text>
            </CardHeader>
            <CardBody>
                <Text>
                    <b>Body: </b>
                    <i>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Maiores, fuga. Dignissimos libero quo beatae
                        totam, fuga labore nobis culpa. Atque quam corrupti
                        odio. Ducimus facere cum aliquam nihil. Ex, numquam?
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Maiores, fuga. Dignissimos libero quo beatae
                        totam, fuga labore nobis culpa. Atque quam corrupti
                        odio. Ducimus facere cum aliquam nihil. Ex, numquam?
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Maiores, fuga. Dignissimos libero quo beatae
                        totam, fuga labore nobis culpa. Atque quam corrupti
                        odio. Ducimus facere cum aliquam nihil. Ex, numquam?
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Maiores, fuga. Dignissimos libero quo beatae
                        totam, fuga labore nobis culpa. Atque quam corrupti
                        odio. Ducimus facere cum aliquam nihil. Ex, numquam?
                    </i>
                </Text>
            </CardBody>
            <CardFooter>
                <Text>
                    <i>03/03/2023 @8:30PM</i>
                </Text>
            </CardFooter>
        </Card>
    );
};

export default EmailPreview;
