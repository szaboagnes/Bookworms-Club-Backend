const User = require('../schemas/user.schema');

exports.findAll = (req, res, next) => {
	User.find()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch(next);
};

exports.findById = (req, res) => {
	res.status(200).json(req.user);
};

exports.create = (req, res, next) => {
	const user = new User(req.body);

	user
		.save()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch(next);
};

exports.delete = (req, res, next) => {
	req.user
		.remove()
		.then(() => {
			res.status(200).json({ message: 'User deleted successfully.' });
		})
		.catch(next);
};

exports.update = (req, res, next) => {
	req.user
		.updateOne({ $set: req.body })
		.then(() => {
			res.status(200).json({ message: 'User updated successfully.' });
		})
		.catch(next);
};
