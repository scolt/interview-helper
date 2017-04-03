import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import news from 'containers/Main/reducers';

const store = createStore(
    combineReducers({
        news
    }),
    applyMiddleware(thunkMiddleware)
);

export default store;
