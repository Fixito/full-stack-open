import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import * as helper from './test_helper.js';

const api = supertest(app);

let token = null;

beforeAll(async () => {
  const user = { username: 'root', name: 'Superuser', password: 'secret123' };
  await User.deleteMany({});
  const response = await api.post('/api/users').send(user);
  token = response.body.token;
});

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

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

describe('addition of a new blog post', async () => {
  test('a valid blog post can be added', async () => {
    const newBlog = {
      title: 'Test post',
      author: 'Peter smith',
      url: 'test-post',
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
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
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    const lastBlog = blogs.at(-1);
    expect(lastBlog.likes).toBe(0);
  });

  test('if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Peter smith',
      url: 'test-post',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('updating a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes += 1;

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('authorization', `Bearer ${token}`)
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

    await api
      .put(`/api/blogs/${invalidId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('deletion of blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await api
      .post('/api/blogs')
      .send(helper.initialBlogs[0])
      .set('authorization', `Bearer ${token}`);
    await api
      .post('/api/blogs')
      .send(helper.initialBlogs[1])
      .set('authorization', `Bearer ${token}`);
  });

  test('succeeds with status 204 if id is valid', async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToDelete = blogAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('when there is initially one user in db', () => {
  test('creation success with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'John',
      name: 'John Doe',
      password: 'secret123',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statusCode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'secret123',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersatEnd = await helper.usersInDb();
    expect(usersatEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statusCode and message if password if missing or less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'john',
      name: 'John Doe',
      password: '',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'Please provide a password with at least 3 characters'
    );

    const usersatEnd = await helper.usersInDb();
    expect(usersatEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
