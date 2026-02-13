import { useState } from 'react'

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (!newComment.trim()) return

    if (addNewComment) {
      addNewComment(todo.id, newComment)
    }

    setNewComment('')
  }

  return (
    <li>
      {/* Title */}
      <span
        style={{
          textDecoration: todo.done ? 'line-through' : 'none'
        }}
      >
        {todo.title}
      </span>

      {/* Buttons */}
      <button onClick={() => toggleDone && toggleDone(todo.id)}>
        Done
      </button>

      <button onClick={() => deleteTodo && deleteTodo(todo.id)}>
        ❌
      </button>

      {/* Add comment form */}
      <div className="new-comment-forms">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>
          Add Comment
        </button>
      </div>

      {/* Comments section */}
      {todo.comments && todo.comments.length === 0 && (
        <p>No comments</p>
      )}

      {todo.comments && todo.comments.length > 0 && (
        <ul>
          {todo.comments.map((comment) => (
            <li key={comment.id}>
              {comment.message}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default TodoItem
