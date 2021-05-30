const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	averageRating: {
		type: Number,
	},
	pages: {
		type: Number,
	},
	reviews: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Review',
		},
	],
});

module.exports = mongoose.model('Book', bookSchema);
