import { Router } from 'express';
import { getAllBlogs, createBlog } from '../controllers/blogs.js';
const router = Router();

router.route('/').get(getAllBlogs).post(createBlog);

export default router;
