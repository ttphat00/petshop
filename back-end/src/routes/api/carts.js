const express = require('express');
const cartController = require('../../app/http/controllers/CartController');
const router = express.Router();

const authMiddleware = require('../../app/http/middleware/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.post('/:id', isAuth, cartController.store);

router.put('/:id', isAuth, cartController.update);

//get my cart
router.get('/my-cart', isAuth, cartController.show);

//delete a product in cart
router.delete('/:id', isAuth, cartController.destroy);

module.exports = router;
