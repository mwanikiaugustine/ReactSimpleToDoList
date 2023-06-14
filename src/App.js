import React from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Learn React Basic", done: true },
    { id: 2, text: "Learn React Advanced", done: false },
    { id: 3, text: "Use React often", done: false }
  ]);

  return (
    <div className="App">
      <h1>ToDoList</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }
  if (!todos.length) {
    return <p>No todos left!</p>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{ textDecoration: todo.done ? "line-through" : "" }}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}
function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      x
    </span>
  );
}
function AddTodo({ setTodos }) {
  const inputRef = React.useRef();
  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addToDo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input placeholder="Add todo" name="addToDo" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
