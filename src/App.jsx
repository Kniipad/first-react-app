import { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./TodoItem";

const TODOLIST_API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // ==============================
  // Fetch todo list
  // ==============================
  async function fetchTodoList() {
    try {
      const response = await fetch(TODOLIST_API_URL);
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      setTodoList(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTodoList();
  }, []);

  // ==============================
  // Add new todo
  // ==============================
  async function addNewTodo() {
    try {
      const response = await fetch(TODOLIST_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();
      setTodoList([...todoList, newTodo]);
      setNewTitle("");
    } catch (error) {
      console.error(error);
    }
  }

  // ==============================
  // Delete todo (frontend only)
  // ==============================
  function deleteTodo(id) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  // ==============================
  // Toggle done (PATCH backend)
  // ==============================
  async function toggleDone(id) {
    try {
      const response = await fetch(
        `${TODOLIST_API_URL}/${id}/toggle/`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle todo");
      }

      const updatedTodo = await response.json();

      setTodoList(
        todoList.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  // ==============================
  // Add new comment
  // ==============================
  async function addNewComment(todoId, newComment) {
    try {
      const response = await fetch(
        `${TODOLIST_API_URL}/${todoId}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      await fetchTodoList();
    } catch (error) {
      console.error("Error adding new comment:", error);
    }
  }

  // ==============================
  // Render
  // ==============================
  return (
    <>
      <h1>Todo List</h1>

      <ul>
        {todoList.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            addNewComment={addNewComment}
          />
        ))}
      </ul>

      <div>
        New:{" "}
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={addNewTodo}>Add</button>
      </div>
    </>
  );
}

export default App;
