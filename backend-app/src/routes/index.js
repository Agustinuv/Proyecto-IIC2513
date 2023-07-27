const express = require('express');

const router = express.Router();

const hello = require('./api/v1/hello.routes');

const user = require('./api/v1/users.routes');

const seller = require('./api/v1/seller.routes');


const plate = require('./api/v1/plates.routes');

const comment = require('./api/v1/comment.routes');

const table = require('./api/v1/table.routes');

const bookedTable = require('./api/v1/booked_table.routes');


router.use('/hello', hello);

router.use('/user', user);

router.use('/seller', seller);

router.use('/plate', plate);

router.use('/comment', comment);

router.use('/table', table);

router.use('/booked_table', bookedTable);

module.exports = router;
