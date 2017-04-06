import memoryStorage from 'common/services/memoryStorage';

import {STORAGE_KEY as interviewStorageKey} from 'containers/reducers';
import {STORAGE_KEY as mainStorageKey} from 'common/reducers/mainReducer';

export function finishInterview(dispatch) {
    dispatch({
        type: 'clear'
    });
    dispatch({
        type: 'redirect',
        path: 'main'
    });
    memoryStorage.remove(interviewStorageKey);
    memoryStorage.remove(mainStorageKey);
}

export function restoreLastPage(dispatch, getState) {
    dispatch({
        type: 'tryToRestore',
        state: memoryStorage.get(interviewStorageKey)
    });

    dispatch({
        type: 'redirect',
        path: memoryStorage.get(mainStorageKey).currentRoute || 'main'
    });
}
