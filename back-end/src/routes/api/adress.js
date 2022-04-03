const express = require('express');
const addressController = require('../../app/http/controllers/AddressController');
const router = express.Router();

const authMiddleware = require('../../app/http/middleware/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.get('/my-address', isAuth, addressController.showByIdUser);
router.get('/:id', addressController.show);

router.post('/', isAuth, addressController.store);

router.delete('/delete-my-all', isAuth, addressController.destroyAll);
router.delete('/:id', addressController.destroy);

router.put('/:id', addressController.update);

module.exports = router;
