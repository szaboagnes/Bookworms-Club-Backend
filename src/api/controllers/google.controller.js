const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user.schema');
const { jsonwebtoken, google, auth } = require('../../config');
const ROLES = require('../constants/roles.constant');

const oAuth2Client = new OAuth2Client(google.GOOGLE_CLIENT_ID);

const generateJWTToken = (userData) => {
	return jwt.sign(userData, jsonwebtoken.SECRET_KEY, {
		expiresIn: auth.TOKEN_EXPIRATION,
	});
};

const generateUsername = (givenName) => {
	let username = givenName.replace(/\s+/g, '');
	username = username.replace(/'+/g, '');
	username = username.replace(/-+/g, '');
	username = username.toLowerCase();

	const number = Math.floor(Math.random() * 10000) + 1;
	username = `${username}${number}`;

	return username;
};

exports.create = (req, res, next) => {
	const userData = req.body;

	const { googleIdToken } = userData;
	delete userData.googleIdToken;

	// validate idToken
	oAuth2Client
		.verifyIdToken({
			idToken: googleIdToken,
			audience: [google.GOOGLE_CLIENT_ID],
		})
		.then(() => {
			User.findOne({ googleId: userData.id })
				.then((foundUser) => {
					if (foundUser) {
						foundUser.familyName = userData.familyName;
						foundUser.givenName = userData.givenName;
						foundUser.photo = userData.photo;

						// update user and send back the token
						foundUser
							.save()
							.then((user) => {
								const tokenData = {
									id: user._id,
									role: user.role,
								};
								const token = generateJWTToken(tokenData);
								res.status(200).json({ token });
							})
							.catch(next);
					} else {
						userData.username = generateUsername(userData.givenName);
						userData.googleId = userData.id;
						delete userData.id;

						// create user and send back the token
						User.create(userData)
							.then((user) => {
								const tokenData = {
									id: user._id,
									role: ROLES.USER,
								};
								const token = generateJWTToken(tokenData);
								res.status(200).json({ token });
							})
							.catch(next);
					}
				})
				.catch(next);
		})
		.catch(() => {
			res.status(401).send({ message: 'Invalid Google token.' });
		});
};
