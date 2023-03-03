// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//We can only send text messages to verified phone numbers... aka ourselves after we confirm we are the owner of the phone number
//since we do not have an upgraded account

function sendTextMessage(){
    client.messages
  .create({
     body: 'This is my first text message',
     messagingServiceSid: 'MG9752274e9e519418a7406176694466fa',
     to: '+15083950012'
   })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));
}

export default sendTextMessage;