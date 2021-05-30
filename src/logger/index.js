const winston = require('winston');
const config = require('./logger.config');

const logger = winston.createLogger(config);

logger.stream = {
	write: (info) => {
		logger.info(info);
	},
};

module.exports = logger;
