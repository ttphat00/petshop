const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productDetail = new Schema({
    idProduct: { type: String },
    quantityPurchased: { type: Number },
    sumCost: { type: Number },
});

const Order = new Schema(
    {
        idCustomer: { type: String },
        address: { type: String },
        orderDate: { type: Date, default: Date.now },
        productDetails: { type: [productDetail] },
        payments: { type: String },
        totalCost: { type: Number },
        shipCost: { type: Number },
        deliveryDate: { type: Date, default: null },
        idEmployee: { type: String, default: null },
        approvalDate: { type: Date, default: null },
        status: { type: String, default: 'Đang chờ xác nhận...' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Order', Order);
