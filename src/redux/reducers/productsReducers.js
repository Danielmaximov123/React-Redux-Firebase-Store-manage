
const initialState = {
    products : [],
    productsLoading : true
}

const productsReduces = (state = initialState , action) => {
    switch (action.type) {
        case 'GET_PRODUCTS' :
            state = { ...state, products : action.payload }
            return state
        case 'SET_PRODUCTS_LOADING' :
            state = { ...state, productsLoading : action.payload }
            return state
        case 'ADD_PRODUCT' :
            state = { ...state, products:[...state.products, action.payload] }
            return state
        case 'UPDATE_PRODUCTS':
            const current = state.products.find((item) => item.productId === action.payload.productId);
            current.products.name = action.payload.data.name;
            current.products.price = action.payload.data.price;
            current.products.quantity = action.payload.data.quantity;
          state = {...state, products: state.products.map((product) =>
            product.productId === action.payload.productId ? current : product
            ),
          };
          return state;
        case 'UPDATE_PRODUCTS':
            const current1 = state.products.find((item) => item.productId === action.payload.productId);
            current1.products.quantity = action.payload.data.quantity - 1;
          state = {...state, products: state.products.map((product) =>
            product.productId === action.payload.productId ? current1 : product
            ),
          };
          return state;
          return state;
          case 'DELETE_PRODUCT':
            const filterProducts = state.products.filter(
              (product) => product.productId !== action.payload
            );
            state = { ...state, products: filterProducts };
            return state;
        default : 
            return state
    }
}

export default productsReduces;