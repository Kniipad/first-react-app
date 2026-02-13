import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TodoItem from '../TodoItem.jsx'

const baseTodo = {
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
}

describe('TodoItem', () => {

  it('renders title correctly', () => {
    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    )

    expect(screen.getByText('Sample Todo')).toBeInTheDocument()
  })

  it('shows "No comments" when there are no comments', () => {
    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    )

    expect(screen.getByText('No comments')).toBeInTheDocument()
  })

  it('does not show "No comments" when there are comments', () => {
    const todoWithComments = {
      ...baseTodo,
      comments: [
        { id: 1, message: 'First comment' }
      ]
    }

    render(
      <TodoItem
        todo={todoWithComments}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    )

    expect(screen.queryByText('No comments')).not.toBeInTheDocument()
  })

  it('renders comment messages correctly', () => {
    const todoWithComments = {
      ...baseTodo,
      comments: [
        { id: 1, message: 'First comment' },
        { id: 2, message: 'Second comment' }
      ]
    }

    render(
      <TodoItem
        todo={todoWithComments}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    )

    expect(screen.getByText('First comment')).toBeInTheDocument()
    expect(screen.getByText('Second comment')).toBeInTheDocument()
  })

})
