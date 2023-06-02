export const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let found = state.cart.find(
        ({slug, choosedVariant}) =>
          slug == action.payload.data.slug &&
          choosedVariant == action.payload.variant
      );

      if (found) {
        found.quantity = found.quantity + action.payload.amount;
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload.data,
              quantity: action.payload.amount,
              choosedVariant: action.payload.variant,
            },
          ],
        };
      }
    };

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter(
          ({slug, choosedVariant}) => !(slug == action.payload.slug && choosedVariant == action.payload.variant)
        ),
      };
    };

    case "ADD_ADDRESS": {
        return {
          ...state, address: [ ...state.address, action.payload ],
        };

    };

    case "REMOVE_ADDRESS": {
      return {
        ...state, address: state.address.filter(({streetAddress}) => streetAddress !== action.payload)
      };
    };

    case "REMOVE_ALL": {
      return {
        ...state,
        cart: [],
      };
    };

    case "SET_INCREMENT": {
      state.cart.map(item => {
          if (item.slug == action.payload.slug && item.choosedVariant == action.payload.variant) {
          item.quantity++
          } 
        })
        return { ...state, cart: [...state.cart] };
    };
    case "SET_DECREMENT": {
      state.cart.map(item => {
          if (item.slug == action.payload.slug && item.choosedVariant == action.payload.variant) {
          item.quantity--
          } 
        })
        return { ...state, cart: [...state.cart] };
    };
 
    case "SET_QUERY" : {
      return {
        ...state,
        searchQuery: action.payload
      };
    }


    

    
    default:
      return state;
  }
};
