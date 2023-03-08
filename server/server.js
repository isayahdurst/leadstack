const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* //catch form submit sms
app.post('/send-sms', async (req, res) => {
    res.send(req.body);
    console.log('body=', req.body);
    const salesPersonPhoneNumber = req.body.salesPersonPhoneNumber;
    const clientPhoneNumber = req.body.clientPhoneNumber;
    const smsBody = req.body.smsBody;
    const message = await client.messages.create({
        body: smsBody,
        from: salesPersonPhoneNumber,
        to: clientPhoneNumber,
    });
    console.log('message=', message);
});

//automatically response when a text message is received from a client
app.post('/respond-sms', (req, res) => {
    console.log('XXXXXXXXXXXX will reply');
    const twiml = new MessagingResponse();
    twiml.message('I received your message and will respond shortly.');
    res.writeHead(200, { 'Content-type': 'text/xml' });
    res.end(twiml.toString());
}); */

//TODO: create post route for sending emails

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    app.use('/graphql', expressMiddleware(server));

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
