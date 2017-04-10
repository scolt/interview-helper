import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import interview from 'containers/reducers';
import main from 'common/reducers/mainReducer';
import modal from 'common/components/modal/modalReducer';

const store = createStore(
    combineReducers({
        main,
        modal,
        interview
    }),
    applyMiddleware(thunkMiddleware)
);

export default store;
