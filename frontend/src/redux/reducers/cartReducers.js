import * as actionTypes from '../constants/cartConstants';

export const cartReducer =(state= { cartItems:[] }, action) =>{
    switch(action.type){
        
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            //check if the product's ID exists in the array
            const existItem = state.cartItems.find((x)=> x.product === item.product)

            // if existed, map through each item in the array and check if the products mapping equals to exisItemproduct
            if(existItem){
                return{
                    ...state,
                    cartItems:state.cartItems.map((x) => x.product === existItem.product ? item : x), // set item = x
                };

            // if not found => first time added to the array (cart)
            } else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item],
                };
            }

            // Add everything to the new the array (to Cart), except the chosen item
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            };
        default:
            return state;
    }
}