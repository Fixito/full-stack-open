import { render, screen } from '@testing-library/react';
import Todo from '../Todos/Todo.js';

describe('<Todo />', () => {
  it('should render correctly the todo', async () => {
    const todo = {
      _id: 1,
      text: 'First todo',
      done: false,
    };

    render(
      <Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />
    );

    expect(screen.getByText(todo.text)).toHaveTextContent(todo.text);
  });
});
