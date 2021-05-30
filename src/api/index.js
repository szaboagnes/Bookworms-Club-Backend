const express = require('express');
const bodyParser = require('body-parser');
const userAPI = require('./routes/user.route');

const router = express.Router();

router.use(bodyParser.json());

router.use('/users', userAPI);

module.exports = router;
