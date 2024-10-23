// store/rootStore.js
import todoStore from './todoStore';
import authStore from './authStore';
import counterStore from './counterStore';

class RootStore {
  constructor() {
    this.todoStore = todoStore;
    this.authStore = authStore;
    this.counterStore = counterStore;

  }
}

const rootStore = new RootStore();
export default rootStore;
