const db = require('../models');
const User = db.user;

exports.users = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        res.status(200).json(users);
    }
    );
}