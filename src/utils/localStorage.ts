export function createLocalStorageManager<T>(key: string, defaultValue: T) {
  return {
    get(): T {
      try {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : defaultValue
      } catch (error) {
        console.error(`Error parsing localStorage item with key "${key}":`, error)

        return defaultValue
      }
    },
    set(value: T) {
      localStorage.setItem(key, JSON.stringify(value))
    },
  }
}
