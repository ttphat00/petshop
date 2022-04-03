const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Address = new Schema(
    {
        addressName: { type: String },
        idUser: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Address', Address);
