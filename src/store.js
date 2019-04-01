const KEY = "SILVERFISH";

class Storage {
  constructor() {
    this.globalStore = this.read()
  }

  read() {
    return JSON.parse(window.localStorage.getItem(KEY)) || {};
  }

  save() {
    window.localStorage.setItem(KEY, JSON.stringify(this.globalStore));
  }

  fetch(key) {
    return this.globalStore[key];
  }

  update(key, value) {
    this.globalStore[key] = value;
  }

  updateSave(key, value) {
    this.update(key, value);
    this.save();
  }
}

export default Storage;