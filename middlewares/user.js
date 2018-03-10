'use strict';

class User {
  // username đăng nhập là những người có 'username', 'sessionId' hợp lệ trong 'this.connections'.

  constructor() {
    this.connections = new Map();
  }

  store(username, val) {
    if (this.connections.has(username)) {
      return false;
    }
    this.connections.set(username, val);
    return true;
  }

  update(username, key, value) {
    if (!this.connections.has(username)) {
      return false;
    }
    let old = this.connections.get(username);
    old[key] = value;
    this.connections.delete(username);
    this.connections.set(username, old);
    return true;
  }

  has(username) {
    return this.connections.has(username);
  }

  get(username) {
    return this.connections.get(username);
  }

  delete(username) {
    this.connections.delete(username);
  }

  getActiveUsers() {
    let list = [];
    for (let [username, obj] of this.connections) {
      if (obj.webSocket) {
        list.push(username);
      }
    }
    console.log(list);
    return list;
  }

  isActive(username) {
    return (this.connections.has(username) && this.connections.get(username).webSocket);
  }

  isLoggedIn(cookies) {
    return (cookies.username && cookies.sessionId &&
      this.has(cookies.username) &&
      this.get(cookies.username).sessionId == cookies.sessionId);
  }
}

module.exports = User;