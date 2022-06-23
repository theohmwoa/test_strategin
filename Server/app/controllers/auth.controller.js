const config = require('../config/auth.config');
const db = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = db.user;

exports.register = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        res.status(201).json({ message: 'User created successfully' });
    });
}

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 
        });
        res.status(200).json({ auth: true, token: token });
    });
}