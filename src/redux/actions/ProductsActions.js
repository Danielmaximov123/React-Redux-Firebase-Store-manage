import firebase from '../../firebaseApp';
import { toast } from 'react-toastify';

const setProductsLoading = (message) => ({
    type: 'SET_PRODUCTS_LOADING',
    payload: message,
  });

  const newProduct = (data) => ({
    type : 'ADD_PRODUCT',
    payload : data
  })

  const setProduct = (data) => ({
    type: 'GET_PRODUCTS',
    payload: data,
  });

  const updateProduct = (data) => {
    return{
        type: 'UPDATE_PRODUCTS',
        payload: data,
    }
};

  const updateQuantity = (data) => {
    return{
        type: 'UPDATE_QUANTITY',
        payload: data,
    }
};

const deleteProduct = (productId) => ({
  type: 'DELETE_PRODUCT',
  payload: productId,
});

  export const getProduct = () => async (dispatch) => {
    dispatch(setProductsLoading(true));
  
    const products = await firebase.firestore().collection("products").get();
  
    const allProducts = [];
  
    products.forEach((item) => {
      
      allProducts.push({ products : item.data() , productId : item.id });
    });
  
    dispatch(setProductsLoading(false));
    dispatch(setProduct(allProducts));
  };

  export const addNewProduct = (data ) => async dispatch => {
    dispatch(setProductsLoading(true))
    let productsCollection = firebase.firestore().collection('products')
    await productsCollection.add(data)
      dispatch(newProduct(data))
      toast.success('Product created successfully!!')
}


export const productUpdate = (productId, data) => (dispatch) => {
  firebase.firestore().collection("products").doc(productId).update({
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  })
  .then(() => {
    dispatch(updateProduct({ productId, data }));
  })
};

export const downQuantity = (data) => (dispatch) => {
  firebase.firestore().collection("products").doc(data.id).update({
    quantity : data.quantity -1
  })
  .then(() => {
    dispatch(updateQuantity({ data }));
  })
};


export const productsDel = (productId) => (dispatch) => {
  firebase.firestore().collection('products').doc(productId).delete()
    .then(() => {
      dispatch(deleteProduct(productId));
        });  
};
