const express = require('express');
const categoryController = require('../../app/http/controllers/CategoryController');
const router = express.Router();

const authMiddleware = require('../../app/http/middleware/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.post('/', isAuth, categoryController.store);
router.delete('/:id', categoryController.destroy);
router.put('/:id', categoryController.update);

//get categories by id_user
router.get('/my-categories', isAuth, categoryController.showByIdUser);

router.get('/:id', categoryController.show);
router.get('/', categoryController.index);

module.exports = router;
