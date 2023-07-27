const express = require('express');
const router = express.Router();
const { authorization } = require('../../../middlewares/authorization');

const commentController = require('../../../controllers/comment.controller');

// Create a new comment --> ok
router.post('/new-comment', authorization, commentController.newComment);

// Edit a comment --> ok
router.patch('/edit-comment', authorization, commentController.editComment);

// Delete a comment --> ok
router.delete('/delete-comment/:comment_id', authorization, commentController.deleteComment);

// Get all comments of a seller --> ok
router.get('/get-comments/:seller_id', commentController.getComments);

// Get one comment --> ok
router.get('/get-comment/:comment_id', commentController.getComment);

module.exports = router;