const express = require('express');
const router = express.Router();

const tableController = require('../../../controllers/table.controller');

// Create a new table
router.post('/new-table', tableController.newTable);

// Delete a table
router.delete('/drop-table/:table_id', tableController.dropTable);

// Get all table of a seller
router.get('/get-tables/:seller_id', tableController.getTables);

// Get all table size of a seller
router.get('/get-table-sizes/:seller_id', tableController.getTablesSizes);


module.exports = router;