import { useState } from "react";

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
  const [newComment, setNewComment] = useState("");

  return (
    <li>
      {/* Title */}
      <span className={todo.done ? "done" : ""}>
        {todo.title}
      </span>

      {/* Toggle button */}
      <button onClick={() => toggleDone(todo.id)}>
        Toggle
      </button>

      {/* Delete button */}
      <button onClick={() => deleteTodo(todo.id)}>
        ❌
      </button>


      {/* Comments */}
      <div>
        {todo.comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          todo.comments.map(comment => (
            <p key={comment.id}>{comment.message}</p>
          ))
        )}
      </div>

      {/* Add comment */}
      <div className="new-comment-forms">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={() => {
            addNewComment(todo.id, newComment);
            setNewComment("");
          }}
        >
          Add Comment
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
