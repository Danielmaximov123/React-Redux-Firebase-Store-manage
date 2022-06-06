import firebase from './../../firebaseApp';
import { toast } from 'react-toastify';

// actions
const setPurchasesLoading = (message) => ({
    type: 'SET_PURCHASES_LOADING',
    payload: message,
  });

const addPurchase = data => ({
    type : 'ADD_PURCHASES',
    payload : data 
})

const getPurchase = data => ({
    type : 'GET_PURCHASES',
    payload : data
})

const deletePurchase = purchaseId => ({
    type : 'DELETE_PURCHASES',
    payload : purchaseId
})


// Action Creators

export const doPurchase = (data) => async dispatch => {
    dispatch(setPurchasesLoading(true))
    let customersPurchases = firebase.firestore().collection('purchases')
    await customersPurchases.add(data).then(() => {
    dispatch(addPurchase(customersPurchases))
    toast.success('Purchase created successfully!!')
    })
}

export const getPurchases = () => async (dispatch) => {
    dispatch(setPurchasesLoading(true))
    const purchases = await firebase.firestore().collection("purchases").get();
    const allPurchases = [];
    
    purchases.forEach((item) => {
        allPurchases.push({ purchases : item.data() , purchaseId : item.id})
    })
    dispatch(setPurchasesLoading(false))
    dispatch(getPurchase(allPurchases))
}

export const purchaseDel = (purchaseId) => (dispatch) => {
    firebase.firestore().collection('purchases').doc(purchaseId).delete()
      .then(() => {
        dispatch(deletePurchase(purchaseId));
          });  
  };