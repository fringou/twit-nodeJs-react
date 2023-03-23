const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.get('/', postsController.readPost);
router.post('/', postsController.createPost);
router.put('/', postsController.updatePost);
router.delete('/', postsController.deletePost);

module.exports = router;