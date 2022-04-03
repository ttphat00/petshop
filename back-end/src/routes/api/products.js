const express = require('express');
const productController = require('../../app/http/controllers/ProductController');
const router = express.Router();

const fileUploader = require('../../config/cloudinary.config');

const authMiddleware = require('../../app/http/middleware/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.post('/', fileUploader.array('file'), isAuth, productController.store);

router.delete('/delete-my-products', isAuth, productController.destroyByIdUser);
router.delete('/:id', productController.destroy);

router.put(
    '/add-images/:id',
    fileUploader.array('file'),
    productController.addImages,
);
router.put('/:id', fileUploader.array('file'), productController.update);

//get products by id_category
router.get('/by-category/:id', productController.showByIdCategory);

//get my products
router.get('/my-products', isAuth, productController.showByIdUser);

router.get('/:id', productController.show);
router.get('/', productController.index);

module.exports = router;
