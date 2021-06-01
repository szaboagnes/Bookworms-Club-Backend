module.exports = Object.freeze({
	database: {
		MONGO_HOST: process.env.MONGO_HOST || 'localhost',
		MONGO_PORT: process.env.MONGO_PORT || 27017,
		MONGO_DATABASE: process.env.MONGO_DATABASE || 'BookwormsClub',
	},
	server: {
		PORT: process.env.PORT || 4000,
	},
	logger: {
		filename: `./logs/${process.env.LOGFILE_NAME || 'bookworms-club.log'}`,
		exitOnError: process.env.LOGGER_EXIT_ON_ERROR || false,
		silent: process.env.SILENT_LOGGER || false,
	},
	google: {
		GOOGLE_CLIENT_ID:
			process.env.GOOGLE_CLIENT_ID ||
			'752195120751-vbn7ibsgnh4ug3dvau3h058o0t3se6jr.apps.googleusercontent.com',
		GOOGLE_CLIENT_SECRET:
			process.env.GOOGLE_CLIENT_SECRET || 'G1qJQRo8kknCLY7u_Hx8aIq-',
	},
	jsonwebtoken: {
		SECRET_KEY:
			process.env.SECRET_KEY ||
			'wP83PQ1z176wpplzFQYZX7C1OkSms0PTN3UEQGhTJf68dKk70iesSi7xlyaFCtP',
	},
	auth: {
		TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '7d',
	}
});
