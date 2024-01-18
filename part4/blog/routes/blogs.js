const express = require('express');
const { getAllBlogs, createBlog } = require('../controllers/blogs.js');
const router = express.Router();

router.route('/').get(getAllBlogs).post(createBlog);

module.exports = router;
