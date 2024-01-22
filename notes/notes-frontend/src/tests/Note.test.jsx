import '@testing-library/jest-dom';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from '../components/Note.jsx';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.getByText(
    /component testing is done with react-testing-library/i
  );
  expect(element).toBeDefined();
});

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = vi.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText(/make not important/i);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
