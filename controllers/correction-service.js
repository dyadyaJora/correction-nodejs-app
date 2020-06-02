const mongoose = require('mongoose');
const Correction = require('../models/session');

function getCorrectionsByUser(userId) {
    return Correction.findOne({ user: userId });
}

function createCorrectionByUser(userId, type, info) {
    return Correction.create({
        type: type,
        info: info,
        user: userId
    });
}

module.exports = {
    getCorrectionsByUser,
    createCorrectionByUser
};