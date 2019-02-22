const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	points: {
		type: Number,
		required: true
	},
	user: { type: Schema.ObjectId, ref: 'User' },
	payload: {}
}, {
	timestamps: true
});

module.exports = mongoose.model('SAN', schema);