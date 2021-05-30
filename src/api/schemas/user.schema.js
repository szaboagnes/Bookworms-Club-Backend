const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const ROLES = require('../constants/roles.constant');

const userSchema = new mongoose.Schema({
	googleId: {
		// Google
		type: String,
		unique: true,
	},
	role: {
		type: String,
		enum: [ROLES.ADMIN, ROLES.USER],
		default: ROLES.USER,
	},
	shelves: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Shelf',
		},
	],
	following: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
		},
	],
	followers: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
		},
	],
	name: {
		// Google
		type: String,
		required: true,
	},
	givenName: {
		// Google
		type: String,
		required: true,
	},
	familyName: {
		// Google
		type: String,
		required: true,
	},
	photo: {
		// Google
		type: String,
	},
	email: {
		// Google
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		validate: [isEmail, 'invalid'],
	},
});

userSchema.plugin(uniqueValidator, { message: 'is already taken' });

module.exports = mongoose.model('User', userSchema);
