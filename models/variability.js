const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  payload: {},
  meta: {}
}, {
  timestamps: true
});

module.exports = mongoose.model('Variability', schema);