class LocalStorageService {
  setItem(key, value) {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }

  getItem(key) {
    return localStorage.getItem(key);
  }
}

export const localStorageService = new LocalStorageService();
