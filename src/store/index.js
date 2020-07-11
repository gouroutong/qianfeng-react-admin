import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import products from './reducers/products'
import notices from './reducers/notices'

const rootReducer = combineReducers({
    products,
    notices
})

const store = createStore(rootReducer,compose(applyMiddleware(...[thunk])))
export default store