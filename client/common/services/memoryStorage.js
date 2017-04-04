export default {
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return {};
        }
    },

    remove(key) {
        window.localStorage.removeItem(key);
    }
};
