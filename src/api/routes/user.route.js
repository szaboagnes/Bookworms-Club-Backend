const express = require('express');
const controller = require('../controllers/user.controller');
// const auth = require('../../middleware/auth');
const decorator = require('../decorators/user.decorator');
// const ROLES = require('../constants/roles.constant');

const router = express.Router();

router.get(
	'/',
	// auth([ROLES.ADMIN]),
	controller.findAll
);

router.get(
	'/:userId',
	// auth([ROLES.ADMIN, ROLES.CURRENT_USER]),
	decorator.decorateWithUserData,
	controller.findById
);

router.post('/', controller.create);

router.delete(
	'/:userId',
	// auth([ROLES.ADMIN, ROLES.CURRENT_USER]),
	decorator.decorateWithUserData,
	controller.delete
);

router.put(
	'/:userId',
	// auth([ROLES.ADMIN, ROLES.CURRENT_USER]),
	decorator.decorateWithUserData,
	controller.update
);

module.exports = router;
