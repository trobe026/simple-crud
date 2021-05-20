const models = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

let connected;

async function connect(host) {
    if (!connected) {
        try {
            await mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  });

        } catch (e) {
            console.log(e);
        }
        connected = true;
    }
    return;
}

async function disconnect() {
    if (connected) {
        await mongoose.disconnect();
        connected = false;
    }
    return;
}

async function flushCollections() {
    for (let model of Object.values(models)) {
        await model.deleteMany({});
    }
}

module.exports = {
    connect,
    disconnect,
    flushCollections,
    ...models
};