const express = require('express');

const userAPI = require('./routes/user.route');
// const bookAPI = require('./routes/book.route');

const router = express.Router();

router.use(express.json());

router.use('/users', userAPI);
// router.use('/books', bookAPI);

module.exports = router;
