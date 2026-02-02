import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { rootReducer } from './reducer/rootReducer';

import { authReducer } from './Auth/Reducer';
import { cartReducer } from './Cart/Reducer';
import { CustomerProductReducer } from './Product/Reducer';
import { orderReducer } from './Order/Reducer';

const rootReducer = combineReducers({
    auth:authReducer,
    products:CustomerProductReducer,
    cart:cartReducer,
    order:orderReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));