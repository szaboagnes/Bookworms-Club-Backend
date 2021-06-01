const User = require('../schemas/user.schema');

exports.decorateWithUserData = (req, res, next) => {
	User.findById(req.params.userId)
		.then((user) => {
			if (user) {
				req.user = user;
				next();
			} else {
				res
					.status(404)
					.json({ message: 'User not found with the provided id.' });
			}
		})
		.catch(next);
};
