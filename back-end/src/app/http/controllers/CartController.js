const Cart = require('../../models/Cart');

class CartController {
    async show(req, res, next) {
        try {
            const cart = await Cart.findOne({ idUser: req.user._id });
            return res.json(cart);
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            let cart = await Cart.findOne({ idUser: req.user._id });
            cart.products.remove(cart.products.id(req.params.id));
            await cart.save();
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async store(req, res, next) {
        try {
            let cart = await Cart.findOne({ idUser: req.user._id });
            if (!cart) {
                const newCart = new Cart({
                    idUser: req.user._id,
                });
                cart = newCart;
            }
            const newProduct = {
                idProduct: req.params.id,
                quantityPurchased: req.body.quantityPurchased,
                sumCost: req.body.sumCost,
            };
            cart.products.push(newProduct);
            await cart.save();
            return res.json(cart);
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            let cart = await Cart.findOne({ idUser: req.user._id });
            cart.products.id(req.params.id).quantityPurchased =
                req.body.quantityPurchased;
            cart.products.id(req.params.id).sumCost = req.body.sumCost;
            await cart.save();
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new CartController();
