import { Router } from 'express';
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from '../controllers/blogs.js';
import { userExtractor } from '../utils/middleware.js';
const router = Router();

router.route('/').get(getAllBlogs).post(userExtractor, createBlog);
router
  .route('/:id')
  .put(userExtractor, updateBlog)
  .delete(userExtractor, deleteBlog);

export default router;
