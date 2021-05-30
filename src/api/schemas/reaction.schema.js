const mongoose = require('mongoose');
const REACTION_TYPES = require('../constants/reactions.constant');

const reactionSchema = new mongoose.Schema({
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
	type: {
		type: String,
		enum: [
			REACTION_TYPES.LIKE,
			REACTION_TYPES.LOVE,
			REACTION_TYPES.CELEBRATE,
			REACTION_TYPES.SAD,
		],
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('Reaction', reactionSchema);
