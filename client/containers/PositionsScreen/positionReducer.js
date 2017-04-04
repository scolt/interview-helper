import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'startProcessing' && action.reqData.model === 'positions') {
        return update(state, {$merge: {isLoading: true}});
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'positions') {
        return update(state, {$merge: {isLoading: false, positions: [...action.resData]}});
    }

    return false;
}
