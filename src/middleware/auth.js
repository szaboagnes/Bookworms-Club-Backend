const jwt = require('jsonwebtoken');
const User = require('../api/schemas/user.schema');
const { jsonwebtoken } = require('../config');
const ROLES = require('../api/constants/roles.constant');

const TOKEN_PREFIX = 'Bearer ';

module.exports = (roles) => (req, res, next) => {
	try {
		let token = req.header('Authorization');

		if (token.startsWith(TOKEN_PREFIX)) {
			token = token.slice(TOKEN_PREFIX.length, token.length);
			const decodedToken = jwt.verify(token, jsonwebtoken.SECRET_KEY);
			const { id, role } = decodedToken;

			if (
				roles.includes(role) ||
				(roles.includes(ROLES.CURRENT_USER) && id === req.params.userId)
			) {
				User.findOne({ _id: id })
					.then((result) => {
						if (result) {
							next();
						} else {
							res.status(401).send({ message: 'Invalid request.' });
						}
					})
					.catch(next);
			} else {
				res.status(403).send({ message: 'Forbidden.' });
			}
		} else {
			res.status(401).send({ message: 'Invalid request.' });
		}
	} catch (err) {
		res.status(401).send({ message: 'Invalid request.' });
	}
};
