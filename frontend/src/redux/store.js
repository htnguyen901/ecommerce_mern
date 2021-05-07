import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import {cartReducer} from './reducers/cartReducers';
import {getProductDetailsReducer, getProductsReducer} from './reducers/productReducers';

const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer
});

const middleware =[thunk];

//set inital value => refresh cart doesnt lose data(save to local storage)

const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const INITIAL_STATE = {
    cart: {
        cartItems: cartFromLocalStorage
    },
};

const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;