const mongoose = require('mongoose');
const Session = require('../models/session');
const Device = require('../models/device');
const ObjectId = mongoose.Types.ObjectId;

const MONGO_URL = "mongodb://localhost:27017/psy-dev";

const bciData = {
    type: 'bci',
    name: 'OpenBCI',
    description: 'Нейрогарнитура мозг компьютер'
}

function connectMongo() {
    return mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}
function getSession(sessionHash, userId) {
    return Session.findOne({ hash: sessionHash, user: userId })
}

function getDevice(deviceHash) {
    return Device.findOne({ hash: deviceHash});
}

function getOrCreateBciDevice(sessionHash, deviceHash) {
    let result = {
        session: '',
        device: ''
    };
    let deviceObject = Object.assign({}, { hash: deviceHash }, bciData);
    return Device.findOneAndUpdate({ hash: deviceHash }, deviceObject, { upsert: true, new: true })
        .then((device) => {
            result['device'] = device;
            return Session.findOneAndUpdate({ hash: sessionHash }, { client: device._id }, { upsert: true, new: true });
        })
        .then(session => {
            result['session'] = session;
            return new Promise((res, rej) => res(result));
        });
}

function getDevicesByUser(userId) {
    return new Promise((resolve, reject) => {
        Session
            .aggregate([{
               $match: {
                   user: ObjectId(userId)
               }
            }, {
                $group: {
                    _id: "$client",
                    count: { $sum:1 },
                    ids: { $push: "$_id" }
                }
            }, {
                $lookup: {
                    from: "devices",
                    localField: "_id",
                    foreignField: "_id",
                    as: "devices_doc"
                }
            }, {
                $lookup: {
                    from: "sessions",
                    localField: "ids",
                    foreignField: "_id",
                    as: "sessions_doc"
                }
            }])
            .exec((err, data) => {
                if (!!err) {
                    reject(err);
                    return;
                }
                let result = data.filter(item => !!item['devices_doc'].length).map(item => {
                    let obj  = Object.assign({}, item['devices_doc'][0]);
                    item['sessions_doc'].forEach(session => {
                        delete session.client;
                        delete session.user;
                    });
                    obj['sessions'] = item['sessions_doc'];
                    obj['data'] = 'empty_now';
                    obj['lastSeen'] = obj.updatedAt; // @todo get this data from ifx
                    return obj;
                });
                console.log(result);
                resolve(result);
            });
    });
}

function syncSessionUser(sessionDbId, userId) {
    return Session.findOneAndUpdate({ _id: sessionDbId }, { user: userId });
}

function main() {
    connectMongo()
        .then(() => {
            return getOrCreateDevice("test-session-new-12", "test-device-new12");
        })
        .then(ok => {
            console.log(ok, "!");
        })
        .catch(err => console.error(err));
}

module.exports = {
    getSession,
    getDevice,
    getOrCreateBciDevice,
    getDevicesByUser,
    syncSessionUser,
    connectMongo,
    main
};