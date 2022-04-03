const express = require('express');
const orderController = require('../../app/http/controllers/OrderController');
const router = express.Router();

const authMiddleware = require('../../app/http/middleware/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.post('/', isAuth, orderController.store);

router.put('/:id', isAuth, orderController.update);

router.delete('/:id', orderController.destroy);

//get orders by id_customer
router.get('/my-orders', isAuth, orderController.showByIdCustomer);

//get orders by id_employee
router.get('/confirmed-orders', isAuth, orderController.showByIdEmployee);

//get orders by status
router.get('/by-status', orderController.showByStatus);

//get an order by id
router.get('/:id', orderController.show);

module.exports = router;
