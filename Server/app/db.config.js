const config = require('./config/auth.config');

module.exports = {
    host: 'strategin.jo5iw.mongodb.net/?retryWrites=true&w=majority',
    user: config.username,
    password: config.password,
};
