import { useState } from "react";

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
  const [newComment, setNewComment] = useState("");

  return (
    <li>
      <span style={{ textDecoration: todo.done ? "line-through" : "" }}>
        {todo.title}
      </span>

      <button onClick={() => toggleDone(todo.id)}>
        {todo.done ? "Undo" : "Done"}
      </button>

      <button onClick={() => deleteTodo(todo.id)}>❌</button>

      <div className="new-comment-forms">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          onClick={() => {
            addNewComment(todo.id, newComment);
            setNewComment("");   // reset ช่องกรอก
          }}
        >
          Add Comment
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
