import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import { afterAll, beforeEach, describe, expect, test } from 'vitest';
import Blog from '../models/blog.js';
import * as helper from './test_helper.js';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a unique identifier property of the blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const { id } = blogsAtStart[0];

    expect(id).toBeDefined();
  });
});

describe('addition of a new blog post', () => {
  test('a valid blog post can be added', async () => {
    const newBlog = {
      title: 'Test post',
      author: 'Peter smith',
      url: 'test-post',
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogs.map((n) => n.title);
    expect(titles).toContain('Test post');
  });

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Test post',
      author: 'Peter smith',
      url: 'test-post',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    const lastBlog = blogs.at(-1);
    expect(lastBlog.likes).toBe(0);
  });

  test(' if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Peter smith',
      url: 'test-post',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('updating a specific blog', () => {
  test.only('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes += 1;

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToUpdate);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.put(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('deletion of blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
