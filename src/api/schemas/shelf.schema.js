const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	books: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Book',
		},
	],
});

module.exports = mongoose.model('Shelf', shelfSchema);
