import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TodoItem from '../TodoItem.jsx'

const baseTodo = {
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
}

describe('TodoItem', () => {

  it('renders with no comments correctly', () => {
    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    )

    expect(screen.getByText('Sample Todo')).toBeInTheDocument()
    expect(screen.getByText('No comments')).toBeInTheDocument()
  })

  it('does not show "No comments" when it has comments', () => {
    const todoWithComment = {
      ...baseTodo,
      comments: [
        { id: 1, message: 'First comment' }
      ]
    }

    render(
      <TodoItem
        todo={todoWithComment}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    )

    expect(screen.queryByText('No comments')).not.toBeInTheDocument()
    expect(screen.getByText('First comment')).toBeInTheDocument()
  })

})
