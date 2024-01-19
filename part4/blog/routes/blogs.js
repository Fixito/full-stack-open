import { Router } from 'express';
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from '../controllers/blogs.js';
const router = Router();

router.route('/').get(getAllBlogs).post(createBlog);
router.route('/:id').put(updateBlog).delete(deleteBlog);

export default router;
