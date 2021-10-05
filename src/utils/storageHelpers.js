
export const LocalStorage = {
  get: (key, defaultValue) => localStorage.getItem(key) || defaultValue,

  save: (key, value) => localStorage.setItem(key, value),
  getObject: (key, defaultValue) => {
    try {
      return JSON.parse(this.get(key, defaultValue))
    } catch (e) {
      return defaultValue || {}
    }
  },
  saveObject: (key, obj) => this.save(key, JSON.stringify(obj)),
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
  has: (key) => Boolean(this.get(key, false))
};