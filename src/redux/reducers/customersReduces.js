
const initialState = {
    customers : [],
    customersLoading : true
}

const customersReduces = (state = initialState , action) => {
    switch (action.type) {
        case 'GET_CUSTOMERS' :
            state = { ...state, customers : action.payload }
            return state
        case 'ADD_CUSTOMER' :
                state = { ...state, customers:[...state.customers, action.payload] }
                return state
        case  'SET_CUSTOMERS_LOADING' :
            state = { ...state, customersLoading : action.payload }
            return state
        case 'UPDATE_CUSTOMERS':
        const current = state.customers.find(
        (item) => item.customerId === action.payload.customerId);
        current.customer.fname = action.payload.data.fname;
        current.customer.lname = action.payload.data.lname;
        current.customer.city = action.payload.data.city;
      state = {
        ...state,
        customers: state.customers.map((customer) =>
        customer.customerId === action.payload.customerId ? current : customer
        ),
      };
      return state;
      case 'DELETE_CUSTOMERS':
        const filterCustomers = state.customers.filter(
          (customer) => customer.customerId !== action.payload
        );
        state = { ...state, customers: filterCustomers };
        return state;
        default : 
            return state
    }
}

export default customersReduces;