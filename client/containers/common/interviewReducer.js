import update from 'react-addons-update';
import memoryStorage from 'common/services/memoryStorage';

export default function (state, action, storageKey) {
    if (action.type === 'setAttribute') {
        const newData = {};
        newData[action.field] = action.value;
        return update(state, {$merge: newData});
    }

    if (action.type === 'tryToRestore') {
        const newData = memoryStorage.get(storageKey);
        return update(state, {$merge: newData});
    }

    return false;
}
