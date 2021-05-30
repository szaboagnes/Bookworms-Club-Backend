const winston = require('winston');
const { logger } = require('../config');

const config = {
	transports: [
		new winston.transports.File({
			filename: logger.filename,
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				winston.format.prettyPrint()
			),
		}),
	],
	exitOnError: logger.exitOnError,
	silent: logger.silent,
};

if (process.env.NODE_ENV !== 'production') {
	config.transports.push(
		new winston.transports.Console({
			level: 'debug',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				winston.format.simple(),
				winston.format.colorize(),
				winston.format.printf(
					(info) => `${info.timestamp} ${info.level}: ${info.message}`
				)
			),
		})
	);
}

module.exports = config;
