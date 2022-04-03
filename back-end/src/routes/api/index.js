const authRouter = require('./auth');
const userRouter = require('./users');
const addressRouter = require('./adress');
const categoryRouter = require('./categories');
const productRouter = require('./products');
const cartRouter = require('./carts');
const orderRouter = require('./orders');

function route(app) {
    //api users
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);

    //api address
    app.use('/api/address', addressRouter);

    //api categories
    app.use('/api/categories', categoryRouter);

    //api products
    app.use('/api/products', productRouter);

    //api carts
    app.use('/api/carts', cartRouter);

    //api orders
    app.use('/api/orders', orderRouter);

    app.use('/', function (req, res) {
        res.send('Pet Shop');
    });
}

module.exports = route;
