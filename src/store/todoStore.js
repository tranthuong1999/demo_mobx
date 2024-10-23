// store/todoStore.js
import { makeAutoObservable, reaction, flow } from "mobx";

class TodoStore {
  todos = [];
  filter = "";

  constructor() {
    makeAutoObservable(this);
    // Reaction để theo dõi sự thay đổi của todos và log ra console
    reaction(
      () => this.todos.length,
      (length) => {
        console.log(`Số lượng todo đã thay đổi: ${length}`);
      }
    );
  }


  // Action bất đồng bộ để lấy danh sách todos từ API
  // Sử dụng flow để tạo action bất đồng bộ
  fetchTodos = flow(function* () {
    this.loading = true;
    try {
      const response = yield fetch("https://jsonplaceholder.typicode.com/todos");
      const data = yield response.json();
      this.todos = data.slice(0, 10); // Lấy 10 todo đầu tiên
    } catch (error) {
      console.error("Lỗi khi lấy todos:", error);
    } finally {
      this.loading = false;
    }
  });
  // async fetchTodos() {
  //   this.loading = true;
  //   try {
  //     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  //     const data = await response.json();
  //     this.todos = data.slice(0, 10); // Lấy 10 todo đầu tiên
  //   } catch (error) {
  //     console.error("Lỗi khi lấy todos:", error);
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  // Action để thêm một todo
  addTodo(todo) {
    this.todos.push({
      id: Date.now(),
      text: todo,
      completed: false
    });
  }

  // Action để xóa một todo
  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  // Action để hoàn thành một todo
  toggleComplete(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  // Computed để lấy danh sách todos đã hoàn thành
  get completedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  // Computed để lấy danh sách todos theo filter
  get filteredTodos() {
    return this.filter
      ? this.todos.filter((todo) =>
        todo.text.toLowerCase().includes(this.filter.toLowerCase())
      )
      : this.todos;
  }

  // Action để thay đổi giá trị filter
  setFilter(value) {
    this.filter = value;
  }
}

const todoStore = new TodoStore();
export default todoStore;
