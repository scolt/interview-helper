import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'setAttribute') {
        const newData = {};
        newData[action.field] = action.value;
        return update(state, {$merge: newData});
    }

    if (action.type === 'tryToRestore') {
        return update(state, {$merge: action.state});
    }

    return false;
}
