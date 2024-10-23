// store/authStore.js
import { makeAutoObservable } from "mobx";

class AuthStore {
  isAuthenticated = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  login(user) {
    this.isAuthenticated = true;
    this.user = user;
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
  }
}

const authStore = new AuthStore();
export default authStore;
