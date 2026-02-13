

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import TodoItem from '../TodoItem.jsx'

const baseTodo = {
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
};

describe('TodoItem', () => {

  it('renders title correctly', () => {
    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    );

    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
  });

  it('shows "No comments" when there are no comments', () => {
    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    );

    expect(screen.getByText('No comments')).toBeInTheDocument();
  });

  it('makes callback to toggleDone when Toggle button is clicked', () => {
    const onToggleDone = vi.fn();

    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={onToggleDone}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /toggle/i });
    fireEvent.click(button);

    expect(onToggleDone).toHaveBeenCalledWith(baseTodo.id);
  });

  it('makes callback to deleteTodo when delete button is clicked', () => {
    const onDeleteTodo = vi.fn();

    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={onDeleteTodo}
        addNewComment={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /❌/i });
    fireEvent.click(button);

    expect(onDeleteTodo).toHaveBeenCalledWith(baseTodo.id);
  });

  it('makes callback to addNewComment when a new comment is added', async () => {
    const onAddNewComment = vi.fn();

    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={onAddNewComment}
      />
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'New comment');

    const button = screen.getByRole('button', { name: /add comment/i });
    fireEvent.click(button);

    expect(onAddNewComment).toHaveBeenCalledWith(baseTodo.id, 'New comment');
  });

});
