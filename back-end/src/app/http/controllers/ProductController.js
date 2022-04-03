const Product = require('../../models/Product');

class ProductController {
    async index(req, res, next) {
        try {
            const products = await Product.find({});
            return res.json(products);
        } catch (error) {
            return next(error);
        }
    }

    async show(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            return res.json(product);
        } catch (error) {
            return next(error);
        }
    }

    async showByIdUser(req, res, next) {
        try {
            const products = await Product.find({ idUser: req.user._id });
            return res.json(products);
        } catch (error) {
            return next(error);
        }
    }

    async showByIdCategory(req, res, next) {
        try {
            const products = await Product.find({ idCategory: req.params.id });
            return res.json(products);
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            await Product.deleteOne({ _id: req.params.id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async destroyByIdUser(req, res, next) {
        try {
            await Product.deleteMany({ idUser: req.user._id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async store(req, res, next) {
        if (!req.files) {
            next(new Error('No file uploaded!'));
            return;
        }

        let newProduct = new Product({
            ...req.body,
            idUser: req.user._id,
        });

        for (let i = 0; i < req.files.length; i++) {
            let imageUrl = {
                url: req.files[i].path,
            };
            newProduct.images.push(imageUrl);
        }

        try {
            await newProduct.save();
            return res.json(newProduct);
        } catch (error) {
            return next(error);
        }
    }

    async addImages(req, res, next) {
        if (!req.files) {
            next(new Error('No file uploaded!'));
            return;
        }
        try {
            let product = await Product.findById(req.params.id);
            for (let i = 0; i < req.files.length; i++) {
                let imageUrl = {
                    url: req.files[i].path,
                };
                product.images.push(imageUrl);
            }
            await product.save();
            return res.json('Added successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            let product = await Product.findById(req.params.id);

            if (req.files.length !== 0) {
                product.images = [];
            }

            for (let i = 0; i < req.files.length; i++) {
                let imageUrl = {
                    url: req.files[i].path,
                };
                product.images.push(imageUrl);
            }

            product.productName = req.body.productName || product.productName;
            product.description = req.body.description || product.description;
            product.quantity = req.body.quantity || product.quantity;
            product.cost = req.body.cost || product.cost;
            product.discount = req.body.discount || product.discount;
            product.idCategory = req.body.idCategory || product.idCategory;

            await product.save();
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ProductController();
