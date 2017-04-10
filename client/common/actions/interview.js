import memoryStorage from 'common/services/memoryStorage';

import {STORAGE_KEY as interviewStorageKey} from 'containers/reducers';
import {STORAGE_KEY as mainStorageKey} from 'common/reducers/mainReducer';

export function finishInterview(dispatch) {
    dispatch({
        type: 'openModal',
        modalText: 'Are you sure you want to finish interview and clear whole interview data. You can\'t undo this action.',
        modalType: 'warning',
        confirmText: 'Finish',
        cancelText: 'Cancel',
        modalSubmit: () => {
            dispatch({
                type: 'clear'
            });
            dispatch({
                type: 'redirect',
                path: 'main'
            });
            dispatch({
                type: 'closeModal'
            });
            memoryStorage.remove(interviewStorageKey);
            memoryStorage.remove(mainStorageKey);
        },
        modalClose: () => {
            dispatch({
                type: 'closeModal'
            });
        }
    });

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
