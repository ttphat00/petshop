const Category = require('../../models/Category');

class CategoryController {
    async index(req, res, next) {
        try {
            const categories = await Category.find({});
            return res.json(categories);
        } catch (error) {
            return next(error);
        }
    }

    async show(req, res, next) {
        try {
            const category = await Category.findById(req.params.id);
            return res.json(category);
        } catch (error) {
            return next(error);
        }
    }

    async showByIdUser(req, res, next) {
        try {
            const categories = await Category.find({ idUser: req.user._id });
            return res.json(categories);
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            await Category.deleteOne({ _id: req.params.id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async store(req, res, next) {
        const newCategory = new Category({
            ...req.body,
            idUser: req.user._id,
        });
        try {
            await newCategory.save();
            return res.json({ title: req.body.title });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            await Category.updateOne({ _id: req.params.id }, req.body);
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new CategoryController();
