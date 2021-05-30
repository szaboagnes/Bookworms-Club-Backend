const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	from: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true,
	},
	activity: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'ReadingActivity',
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('Comment', commentSchema);
