const Address = require('../../models/Address');

class AddressController {
    async show(req, res, next) {
        try {
            const address = await Address.findById(req.params.id);
            return res.json(address);
        } catch (error) {
            return next(error);
        }
    }

    async showByIdUser(req, res, next) {
        try {
            const address = await Address.find({ idUser: req.user._id });
            return res.json(address);
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            await Address.deleteOne({ _id: req.params.id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }
    async destroyAll(req, res, next) {
        try {
            await Address.deleteMany({ idUser: req.user._id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async store(req, res, next) {
        const newAddress = new Address({
            ...req.body,
            idUser: req.user._id,
        });
        try {
            await newAddress.save();
            return res.json({ addressName: req.body.addressName });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            await Address.updateOne({ _id: req.params.id }, req.body);
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AddressController();
