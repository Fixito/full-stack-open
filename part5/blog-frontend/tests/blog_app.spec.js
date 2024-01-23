// @ts-check
import { test, expect } from '@playwright/test';

const user = { name: 'John Doe', username: 'john', password: 'secret123' };
const BLOGS = [
  { title: 'First test blog', author: 'John Doe', url: 'first-blog' },
];

const createBlog = async ({ page, blog }) => {
  await page.getByRole('button', { name: /create new blog/i }).click();
  expect(page.getByRole('heading', { name: /create new/i })).toBeVisible;

  const titleInput = page.getByRole('textbox', { name: /title/i });
  await titleInput.fill(blog.title);

  const authorInput = page.getByRole('textbox', { name: /author/i });
  await authorInput.fill(blog.author);

  const urlInput = page.getByRole('textbox', { name: /url/i });
  await urlInput.fill(blog.url);

  await page.getByRole('button', { name: /create/i }).click();
};

const loginUser = async ({ page, user }) => {
  const usernameInput = page.getByRole('textbox', { name: /username/i });
  const passwordInput = page.getByRole('textbox', { name: /password/i });

  await usernameInput.fill(user.username);
  await passwordInput.fill(user.password);

  await page.getByRole('button', { name: /login/i }).click();
};

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', { data: user });
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /log in to application/i })
    ).toBeVisible();
    await expect(
      page.getByRole('textbox', { name: /username/i })
    ).toBeVisible();
    await expect(
      page.getByRole('textbox', { name: /password/i })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginUser({ page, user });

      await expect(page.getByRole('heading', { name: /blogs/i })).toBeVisible();
      await expect(page.getByText(user.username)).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = page.getByRole('textbox', { name: /username/i });
      const passwordInput = page.getByRole('textbox', { name: /password/i });
      const wrongPassword = 'wrong';

      await usernameInput.fill(user.username);
      await passwordInput.fill(wrongPassword);

      await page.getByRole('button', { name: /login/i }).click();

      await expect(
        page.getByText(/Invalid username or password/i)
      ).toBeVisible();
    });
  });

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginUser({ page, user });
    });

    test('a blog can be created', async ({ page }) => {
      await createBlog({ page, blog: BLOGS[0] });

      await expect(page.getByTestId('blog')).toContainText(BLOGS[0].title);
      await expect(page.getByTestId('blog')).toContainText(BLOGS[0].author);
    });

    test('a blog can be liked', async ({ page }) => {
      await createBlog({ page, blog: BLOGS[0] });
      await page.getByRole('button', { name: /view/i }).click();

      await expect(page.getByText('like like')).toContainText(/0/);

      await page.getByRole('button', { name: /like/i }).click();

      await expect(page.getByText('like like')).toContainText(/1/);
    });

    test('a blog can be deleted', async ({ page }) => {
      await createBlog({ page, blog: BLOGS[0] });

      const blogItems = page.getByTestId('blog');
      await expect(blogItems).toHaveCount(1);

      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });

      await page.getByRole('button', { name: /remove/i }).click();
      await expect(blogItems).toHaveCount(0);
    });

    test('only the owner of the blog post can see the remove button', async ({
      page,
      request,
    }) => {
      await createBlog({ page, blog: BLOGS[0] });
      await page.getByRole('button', { name: /logout/i }).click();

      const user = { name: 'Peter', username: 'peter', password: 'secret123' };
      await request.post('http://localhost:3003/api/users', { data: user });
      await loginUser({ page, user });

      await expect(
        page.getByRole('button', { name: /remove/i })
      ).not.toBeVisible();
    });
  });
});
