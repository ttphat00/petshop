const Order = require('../../models/Order');

class OrderController {
    async showByIdCustomer(req, res, next) {
        try {
            const orders = await Order.find({ idCustomer: req.user._id });
            return res.json(orders);
        } catch (error) {
            return next(error);
        }
    }

    async showByIdEmployee(req, res, next) {
        try {
            const orders = await Order.find({ idEmployee: req.user._id });
            return res.json(orders);
        } catch (error) {
            return next(error);
        }
    }

    async showByStatus(req, res, next) {
        try {
            const orders = await Order.find(req.body);
            return res.json(orders);
        } catch (error) {
            return next(error);
        }
    }

    async show(req, res, next) {
        try {
            const order = await Order.findById(req.params.id);
            return res.json(order);
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            await Order.deleteOne({ _id: req.params.id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async store(req, res, next) {
        try {
            let newOrder = new Order({
                idCustomer: req.user._id,
                ...req.body,
            });

            if (!req.body.products) {
                let product = {
                    idProduct: req.body.idProduct,
                    quantityPurchased: req.body.quantityPurchased,
                    sumCost: req.body.sumCost,
                };
                newOrder.productDetails.push(product);
            } else {
                for (let i = 0; i < req.body.products.length; i++) {
                    let product = {
                        idProduct: req.body.products[i].idProduct,
                        quantityPurchased:
                            req.body.products[i].quantityPurchased,
                        sumCost: req.body.products[i].sumCost,
                    };
                    newOrder.productDetails.push(product);
                }
            }

            await newOrder.save();
            return res.json(newOrder);
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            await Order.updateOne(
                { _id: req.params.id },
                {
                    ...req.body,
                    idEmployee: req.user._id,
                },
            );
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new OrderController();
