const express = require('express');

const router = express.Router();

const db = require('../../../models');

router.get('/', (req, res) => {
    res.status(200).send('Hello World');
    }
);

module.exports = router;