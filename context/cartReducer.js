export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART" : 
    return {...state, cart: [...state.cart, {...action.payload.data, quantity: action.payload.amount, choosedVariant: action.payload.variant}]}
    case "REMOVE_FROM_CART" : 
    return {...state, cart: state.cart.filter(compare => compare.slug !== action.payload)}
    case "SET_INCREMENT" : {
     let updatedProduct = state.cart.map(item => {
        if (item.slug == action.payload.slug) {
           const incremented = item.qty + action.payload.amount
           return {
            ...item,
            amount : incremented
           }
        } else {
            return item
        }
     })
     return updatedProduct
    }
    case "SET_DECREMENT" : 
    return {...state, cart: [...state.cart]}
    default:
      return state;
  }
};
