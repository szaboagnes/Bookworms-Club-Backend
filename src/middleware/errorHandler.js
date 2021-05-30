const logger = require('../logger');
const ERRORS = require('../api/constants/errors.constant');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	if (err.name === ERRORS.VALIDATION_ERROR_TYPE) {
		res.status(400).json({ message: err.message });
	} else if (err.name === ERRORS.CAST_ERROR_TYPE) {
		res.status(400).json({ message: 'Invalid ObjectId' });
	} else {
		logger.error(err.message, { stack: err.stack });
		res.status(500).json({ message: 'Internal server error.' });
	}
};
