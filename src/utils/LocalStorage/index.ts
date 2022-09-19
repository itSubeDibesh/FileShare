export const Store = {
    save: (key: string, value: any) => localStorage.setItem(key, value),
    get: (key: string) => localStorage.getItem(key),
    delete: (key: string) => localStorage.removeItem(key),
    wipe: () => localStorage.clear(),
    length: localStorage.length
}