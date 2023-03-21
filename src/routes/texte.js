const express = require('express');
const router = express.Router();

const { allPosts, addPost } = require('../controllers/texte.js');

router.get('/',allPosts)
router.post('/add', addPost)



module.exports = router;
