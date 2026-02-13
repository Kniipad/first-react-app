import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from "./TodoItem";

const TODOLIST_API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // ดึงข้อมูลจาก Flask
   async function addNewComment(todoId, newComment) {     // เพิ่ม parameter
    try {
      const url = `${TODOLIST_API_URL}${todoId}/comments/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'message': newComment }),    // ใช้ newComment
      });
      if (response.ok) {
        // 
        // ******  ลบบรรทัด setNewComments({ ...newComments, [todoId]: "" }); *******
        // 
        await fetchTodoList();
      }
    } catch (error) {
      console.error("Error adding new comment:", error);
    }
  }
  
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
      alert("Failed to fetch todo list from backend.");
    }
  }

  useEffect(() => {
    fetchTodoList();
  }, []);

  // เพิ่ม todo
  async function addNewTodo() {
    try {
      const response = await fetch(TODOLIST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  function deleteTodo(id) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  function toggleDone(id) {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

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


      New:{" "}
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={addNewTodo}>Add</button>
    </>
  );
}

export default App;
