const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    idProduct: { type: String, unique: true },
    quantityPurchased: { type: Number, default: 1 },
    sumCost: { type: Number },
});

const Cart = new Schema(
    {
        idUser: { type: String },
        products: { type: [Product], default: [] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Cart', Cart);
