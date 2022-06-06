
const initialState = {
    purchases : [],
    purchasesLoading : true
}

const purchasesReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'GET_PURCHASES' :
            state = { ...state, purchases : action.payload }
            return state
        case 'SET_PURCHASES_LOADING' :
            state = { ...state, purchasesLoading : action.payload }
            return state
        case 'ADD_PURCHASES' :
            state = { ...state, purchases:[...state.purchases, action.payload] }
            return state
        case 'DELETE_PURCHASES' : 
        const filterPurchases = state.purchases.filter(
            (purchase) => purchase.purchaseId !== action.payload
          );
          state = { ...state, purchases: filterPurchases };
          return state;
        default : 
            return state
    }
}

export default purchasesReducer;