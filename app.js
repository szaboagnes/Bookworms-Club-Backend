const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const logger = require('./src/logger');
const api = require('./src/api');
const authAPI = require('./src/api/routes/auth.route');
const { server, database } = require('./src/config');
const errorMiddleware = require('./src/middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(cors())

// Logger
app.use(morgan('combined', { stream: logger.stream }));

app.use(express.urlencoded({ extended: true }));

// Endpoints
app.use('/api', api);

app.use('/auth', authAPI);

app.use('/', (req, res) => {
	res.status(404).send({ message: 'Error: endpoint not found.' });
});

// Error handling
app.use(errorMiddleware);

// MongoDB
mongoose
	.connect(
		`mongodb://${database.MONGO_HOST}:${database.MONGO_PORT}/${database.MONGO_DATABASE}?ssl=false`,
		{
			poolSize: 10,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			connectTimeoutMS: 5000,
			sslValidate: false,
		}
	)
	.then(() => {
		logger.info('Database connection set up');
	})
	.catch((error) => {
		logger.error('Database connection error: ', error);
		process.exit(1);
	});

mongoose.connection.on('error', () => {
	logger.error('Connection to database has been lost');
});

// Server start
app.listen(server.PORT, (error) => {
	if (error) {
		logger.error('Server initialization error: ', error);
		process.exit(1);
	} else {
		logger.info(`Server listening at ${server.PORT}`);
	}
});
