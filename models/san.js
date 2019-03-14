const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  points: {
    s: Number,
    a: Number,
    n: Number
  },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  payload: {}
}, {
  timestamps: true
});

module.exports = mongoose.model('SAN', schema);