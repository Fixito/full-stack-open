import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm.jsx';

describe('<BlogForm', () => {
  test('calls onSubmit', async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm addBlog={createBlog} />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'testing title');
    await user.type(inputs[1], 'testing author');
    await user.type(inputs[2], 'testing-url');
    const submitBtn = screen.getByRole('button', { name: /create/i });
    await user.click(submitBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('testing title');
    expect(createBlog.mock.calls[0][0].author).toBe('testing author');
    expect(createBlog.mock.calls[0][0].url).toBe('testing-url');
  });
});
