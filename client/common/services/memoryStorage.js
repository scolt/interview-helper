export default {
    timeouts: {},

    set(key, value) {
        clearTimeout(this.timeouts[key]);
        this.timeouts[key] = setTimeout(() => {
            window.localStorage.setItem(key, JSON.stringify(value));
        }, 1000);
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
