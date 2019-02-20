const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	token: {
		type: String,
		required: true
	},
	meta: {}
}, {
	timestamps: true
});

module.exports = mongoose.model('User', schema);