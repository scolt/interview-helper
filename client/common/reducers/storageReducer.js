import memoryStorage from 'common/services/memoryStorage';

export default function (storageKey, actionsForSet) {
    return function (state, action) {
        if (actionsForSet.indexOf(action.type) > -1) {
            memoryStorage.set(storageKey, state);
        }

        if (action.type === 'clearStorageAndGoHome') {
            memoryStorage.remove(storageKey);
            setTimeout(() => window.location.hash = '');
        }
    };
}
