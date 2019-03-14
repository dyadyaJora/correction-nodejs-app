const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  points: {
    anxiety: {
      val: Number,
      percent: Number
    },
    conflict: {
      val: Number,
      percent: Number
    },
    performance: {
      val: Number,
      percent: Number
    },
    fatigue: {
      val: Number,
      percent: Number
    }
  },
  arrays: {
    one: Array,
    two: Array
  },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Lusher', schema);