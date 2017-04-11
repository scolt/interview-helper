import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'setAttribute') {
        const {validators} = state;
        const newData = {};

        if (validators[action.field]) {
            const regExp = new RegExp(validators[action.field].testQuery, 'i');
            validators[action.field].error = !regExp.test(action.value);
            newData.validators = {...validators};
        }

        newData[action.field] = action.value;
        return update(state, {$merge: newData});
    }

    if (action.type === 'tryToRestore') {
        return update(state, {$merge: action.state});
    }

    return false;
}
