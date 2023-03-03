const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended = false }));

//this won't work until we have deployed the site to heroku
// https://console.twilio.com/us1/develop/phone-numbers/manage/incoming?frameUrl=%2Fconsole%2Fphone-numbers%2Fincoming%2FPNe2aae9a136ed2bace188db7967735692%3Fx-target-region%3Dus1
//I will need to update the Webhook section with the heroku webaddress
//https://www.youtube.com/watch?v=uxUHWKwQeLw
app.post('/message', (req,res) => {
    console.log(req.body);
    const msgFrom = req.body.From;
    const msgBody = req.body.Body;

    res.send(`
        <Response>
            <Message>
                Hello ${msgFrom}. You said ${msgBody}.
            </Message>
        </Response>
    `);
});