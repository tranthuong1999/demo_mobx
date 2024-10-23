// App.js
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./store/storeContext";
import { toJS } from "mobx";
// import todoStore from "./store/todoStore";

const App = () => {

  const [todoText, setTodoText] = useState("");
  const { todoStore, counterStore } = useStore();

  useEffect(() => {
    todoStore.fetchTodos();
  }, []);

  // Hàm thêm todo
  const handleAddTodo = () => {
    if (todoText.trim()) {
      todoStore.addTodo(todoText);
      setTodoText("");
    }
  };

  console.log("list todo", toJS(todoStore.todos))

  return (
    <div>
      <h1>Todo List with MobX</h1>
      <h1>Count: {counterStore.count}</h1>
      <button onClick={() => counterStore.increment()}>Increment</button>

      {/* Thêm todo */}
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {/* Bộ lọc */}
      <input
        type="text"
        value={todoStore.filter}
        onChange={(e) => todoStore.setFilter(e.target.value)}
        placeholder="Filter todos"
      />

      {/* Danh sách todo */}
      <ul>
        {todoStore.filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoStore.toggleComplete(todo.id)}
            />
            {todo.text}
            <button onClick={() => todoStore.removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Số lượng todos đã hoàn thành */}
      <div>
        <h3>Completed Todos: {todoStore.completedTodos.length}</h3>
      </div>
    </div>
  );
};

export default observer(App);
