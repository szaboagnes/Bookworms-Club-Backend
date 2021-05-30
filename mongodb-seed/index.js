const path = require('path');
const { Seeder } = require('mongo-seeding');

const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'BookwormsClub';

const config = {
	database: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
	dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve('./data'), {
	transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});

seeder
	.import(collections)
	.then(() => {
		console.log('Successful seeding');
	})
	.catch((err) => {
		console.log('Error in seeding', err);
	});
