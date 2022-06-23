const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const auth = require('./app/routes/auth.routes');
const users = require('./app/routes/users.routes');

const app = express();
var corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my strateg.in test'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

db.mongoose.connect('mongodb+srv://root:root@strategin.jo5iw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB: ', err.message);
});

app.use('/', auth);
app.use('/', users);