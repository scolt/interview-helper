import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import interview from 'containers/reducers';
import main from 'common/reducers/mainReducer';

const store = createStore(
    combineReducers({
        interview,
        main
    }),
    applyMiddleware(thunkMiddleware)
);

export default store;
