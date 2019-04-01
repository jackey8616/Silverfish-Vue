const KEY = "SILVERFISH";
export default {
  read() {
    return JSON.parse(window.localStorage.getItem(KEY)) || {};
  },
  save(item) {
    window.localStorage.setItem(KEY, JSON.stringify(item));
  }
}