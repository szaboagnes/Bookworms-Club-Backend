const express = require('express');
const googleController = require('../controllers/google.controller');

const router = express.Router();

// router.use(express.json());

/*
POST - /auth/login/google 
Updates user with given googleId if it already exists, otherwise inserts a new user
Body parameters:
    googleId: Required
    name: Required - in case of a new user
    lastName: Required - in case of a new user
    firstName: Required - in case of a new user
    photo: Required - in case of a new user
    email: Required - in case of a new user
*/
router.post('/login/google', googleController.create);

module.exports = router;
