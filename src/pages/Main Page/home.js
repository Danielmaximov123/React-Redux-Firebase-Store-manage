import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { getCustomer } from '../../redux/actions/customerActions';
import { getPurchases } from '../../redux/actions/purchaseAction';
import { getProduct } from '../../redux/actions/ProductsActions';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { allCustomers , allPurchases , allProducts ,productsLoading , customersLoading , purchasesLoading , productId } = useSelector(
    (state) => ({
      allPurchases : state.purchases.purchases,
      allCustomers : state.customers.customers,
      allProducts : state.products.products,
      customersLoading : state.customers.customersLoading,
      purchasesLoading : state.purchases.purchasesLoading,
      productsLoading : state.products.productsLoading
    }),
    shallowEqual,
    )

  useEffect(() => {
    if(customersLoading , purchasesLoading , productsLoading) {
      dispatch(getCustomer());
      dispatch(getPurchases());
      dispatch(getProduct())
    }
  }, [dispatch ,allCustomers , allPurchases , allProducts]);


  return (
    <div style={{textAlign : "center"}}>
      <h2>Welcome To E-commerce System</h2>
      <div style={{width: '40%',
marginRight: 'auto',
marginLeft: 'auto' ,paddingTop : "5px"}}>
      <Grid container >
          <Grid item xs={2} md={4} style={{cursor : "pointer"}} onClick={()=> navigate("/customers")}>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
          {
            allCustomers.length > 0 ? 
            <span>You Have a {allCustomers.length} Customers</span>
            : <span>You have no customers</span>
          }
          </Box>
          </Grid>
      <Grid item xs={2} md={4} style={{cursor : "pointer"}} onClick={()=> navigate("/products")}>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      {
        allProducts.length > 0 ? 
        <span>You Have a {allProducts.length} Products</span>
        : <span>You have no Products</span>
      }
      </Box>
      </Grid>
      <Grid item xs={2} md={4} style={{cursor : "pointer"}} onClick={()=> navigate("/purchases")}>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      {
        allPurchases.length > 0 ? 
        <span>You Have a {allPurchases.length} Purchases</span>
        : <span>You have no Purchases</span>
      }
      </Box>
    </Grid>
      </Grid>
      </div>
    </div>
  )
}

export default HomePage