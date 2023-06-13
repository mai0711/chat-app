const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.', '.env') });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

const authenticationRoute = require('./routes/authenticationRoutes');
const chatRoomRoute = require('./routes/chatRoomRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('', {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.error('connected to database'));

app.use('/api/auth', authenticationRoute);
app.use('/api/posts', chatRoomRoute);

app.listen(port, () => {
  console.log('Server is running');
});
