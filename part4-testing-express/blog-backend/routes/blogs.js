import { Router } from 'express';
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getSingleBlog,
} from '../controllers/blogs.js';
import { userExtractor } from '../utils/middleware.js';
import {
  createComment,
  getSingleBlogComments,
} from '../controllers/comments.js';
const router = Router();

router.route('/').get(getAllBlogs).post(userExtractor, createBlog);
router
  .route('/:id')
  .get(getSingleBlog)
  .put(userExtractor, updateBlog)
  .delete(userExtractor, deleteBlog);
router.route('/:id/comments').get(getSingleBlogComments).post(createComment);

export default router;
