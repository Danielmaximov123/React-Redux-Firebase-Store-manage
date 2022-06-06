import firebase from './../../firebaseApp';
import { toast } from 'react-toastify';


const setCustomersLoading = (message) => ({
    type: 'SET_CUSTOMERS_LOADING',
    payload: message,
  });

  const setCustomer = (data) => ({
    type: 'GET_CUSTOMERS',
    payload: data,
  });

const newCustomer = (data) => {
  return {
    type : 'ADD_CUSTOMER',
    payload : data
}}

const updateCustomer = (data) => {
  return{
      type: 'UPDATE_CUSTOMERS',
      payload: data,
  }
};

const deleteCustomer = (customerId) => ({
  type: 'DELETE_CUSTOMERS',
  payload: customerId,
});


  export const getCustomer = () => async (dispatch) => {
    dispatch(setCustomersLoading(true));
  
    let customers = await firebase.firestore().collection("customers").get();
  
    let allCustomer = [];
  
    customers.forEach((item) => {
      
        allCustomer.push({ customer : item.data() , customerId : item.id });
    });
  
    dispatch(setCustomersLoading(false));
    dispatch(setCustomer(allCustomer));
  };


  export const addNewCustomer = (data) => async dispatch => {
    dispatch(setCustomersLoading(true));
    let customersCollection = firebase.firestore().collection('customers')
    await customersCollection.add(data)
    dispatch(newCustomer(customersCollection))
    toast.success('Customer created successfully!!')
}

          
export const customerUpdate = (customerId, data) => (dispatch) => {
  firebase.firestore().collection("customers").doc(customerId).update({
    fname: data.fname,
    lname: data.lname,
    city: data.city,
  })
  .then(() => {
    dispatch(updateCustomer({ customerId, data }));
  })
};

export const customertDel = (customerId) => (dispatch) => {
  firebase.firestore().collection('customers').doc(customerId).delete()
    .then(() => {
      dispatch(deleteCustomer(customerId));
        });  
};