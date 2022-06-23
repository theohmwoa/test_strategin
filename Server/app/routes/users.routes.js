const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controllers');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    let token = bearerHeader.split(' ')[1];
    if (!bearerHeader) {
        res.status(401).json({ message: 'No token' });
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized request' });
            return;
        }
        req.userId = decoded.id;
        next();
    });
};

router.get('/users', verifyToken, controller.users);

module.exports = router;