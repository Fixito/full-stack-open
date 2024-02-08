import React from 'react';
import Todo from './Todo.js';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      {todos.map((todo) => {
        return (
          <React.Fragment key={todo._id}>
            <hr />
            <Todo
              todo={todo}
              onClickDelete={onClickDelete}
              onClickComplete={onClickComplete}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default TodoList;
