const db = require('../models');
const User = db.user;

checkUserExists = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        if (user) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        next();
    });
};

checkEmailExists = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        if (user) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkUserExists,
    checkEmailExists
};

module.exports = verifySignUp;