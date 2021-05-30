const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	from: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true,
	},
	book: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Book',
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
});

module.exports = mongoose.model('Review', reviewSchema);
