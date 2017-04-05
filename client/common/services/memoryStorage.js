export default {
    timeout: null,

    set(key, value) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('set');
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
