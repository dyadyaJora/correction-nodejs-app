const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    type: {
        type: String,
        default: ''
    },
    info: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Correction = mongoose.model('Correction', schema);

module.exports = Correction;