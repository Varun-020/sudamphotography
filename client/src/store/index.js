import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AllReducer from './reducers/allReducer'


const rootReducers = combineReducers({
    AllReducer
});

const middlewares = [thunkMiddleware]
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));
export default Store;
