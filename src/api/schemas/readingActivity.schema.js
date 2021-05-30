const mongoose = require('mongoose');
const READING_ACTIVITY_TYPES = require('../constants/readingActivities.constant');

const readingActivitySchema = new mongoose.Schema({
	type: {
		type: String,
		enum: [
			READING_ACTIVITY_TYPES.READ,
			READING_ACTIVITY_TYPES.TO_READ,
			READING_ACTIVITY_TYPES.CURRENTLY_READING,
		],
		required: true,
	},
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true,
	},
	book: {
		type: String,
	},
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('ReadingActivity', readingActivitySchema);
