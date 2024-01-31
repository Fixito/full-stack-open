import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog.jsx';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
  const blog = {
    title: 'Test Post',
    author: 'John Doe',
    url: 'test-post',
    likes: 0,
    user: {
      name: 'John Doe',
      username: 'Superuser',
      id: '65aad2757016beaf3581f88f',
    },
    id: '65ae41be64c090c27748ed04',
  };

  beforeEach(() => {
    render(<Blog blog={blog} />);
  });

  test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    const title = screen.getByText(/Test Post/);
    expect(title).toBeInTheDocument();

    const author = screen.queryAllByText(/John Doe/)[0];
    expect(author).toBeInTheDocument();

    const url = screen.queryByText(blog.url);
    expect(url).not.toBeInTheDocument();

    const likes = screen.queryByText(/0/);
    expect(likes).not.toBeInTheDocument();
  });

  test('after clicking view button, URL and author are shown', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /view/i });
    await user.click(button);

    const url = screen.queryByText(blog.url);
    expect(url).toBeInTheDocument();

    const likes = screen.queryByText(/0/);
    expect(likes).toBeInTheDocument();
  });
});
