const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Image = new Schema({
    url: { type: String },
});

const Product = new Schema(
    {
        productName: { type: String },
        description: { type: String },
        quantity: { type: Number },
        cost: { type: Number },
        discount: { type: Number, default: 0 },
        idCategory: { type: String },
        idUser: { type: String },
        images: { type: [Image] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);
