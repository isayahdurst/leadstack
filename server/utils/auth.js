const jwt = require('jsonwebtoken');
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
        }

        if (!token) {
        return req;
        }

        try {
            const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
            req.user = data;
            console.log(token);
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({ first_name, last_name, phone_number, email, _id }) {
        const payload = { first_name, last_name, phone_number, email, _id };
        return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: expiration });
    },
};
  