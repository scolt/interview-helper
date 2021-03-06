import update from 'react-addons-update';
import mainModel from '../common/mainModel';
import storageReducer from './storageReducer';

import config from 'common/config/config';
export const STORAGE_KEY = 'intrvw-current-route-' + config.version;

const storage = storageReducer(STORAGE_KEY, ['redirect']);

export default function main(state = mainModel, action) {
    if (action.type === 'redirect') {
        const nesState = update(state, {
            $merge: {
                currentRoute: action.path
            }
        });

        storage(nesState, action);

        return nesState;
    }

    return state;
}
