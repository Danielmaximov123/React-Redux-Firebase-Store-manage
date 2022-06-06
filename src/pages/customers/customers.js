import { CircularProgress, ListItem, ListItemButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCustomer  } from '../../redux/actions/customerActions';
import { getPurchases  } from '../../redux/actions/purchaseAction';
import { getProduct } from './../../redux/actions/ProductsActions';
import { Button } from '@mui/material';
import  AddIcon  from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const CustomersComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { allCustomers , allPurchases , allProducts , productsLoading , customersLoading , purchasesLoading , customerId } = useSelector(
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
  const customers = allCustomers.filter(customer => customer.customers?.customerId === customerId && customer)


  useEffect(() => {
    if(customersLoading) {
      dispatch(getCustomer());
    }
  }, [dispatch]);

  useEffect(() => {
    if(productsLoading , purchasesLoading) {
      dispatch(getProduct())
      dispatch(getPurchases());
    }
  } , [dispatch , allProducts , allPurchases])



  return (
    <div>
      <div className="main-customers">
        <h1>Customers</h1>
          <div style={{marginLeft: 'auto', marginRight: 'auto',width: '50%'}}>
          <Button onClick={()=> navigate("/new-customer")} style={{marginRight: '49rem', marginBottom : "5px"}} variant="outlined" startIcon={<AddIcon />}>
          Add Customer
        </Button>
          </div>
        {
          customersLoading ? <CircularProgress /> :
        <TableContainer
        component={Paper}
          style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
        >
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>Full Name</TableCell>
                <TableCell style={{ textAlign: "center" }}>Purchased Products</TableCell>
                <TableCell style={{ textAlign: "center" }}>Purchased Date</TableCell>
                <TableCell style={{ textAlign: "center" }}>Customer Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((item , index) => (
                
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                  <ListItemButton>
                  <Link to={"/customers/" + item?.customerId}>{item.customer?.fname + " " + item.customer?.lname} </Link>
                  </ListItemButton>
                  </TableCell>
                  <TableCell>
                  {allPurchases.find(find => find.purchases?.customerId == item?.customerId) != undefined ?
                                
                                <>{
                                  allPurchases.map((buyer,index)=> {
                                        return <div key={index}> 
                                        {
                                            buyer.purchases?.customerId == item?.customerId ?
                                            <ListItem>
                                                <Link to={"/products/"+ buyer.purchases?.productId}>{allProducts.find(p => p.productId == buyer.purchases?.productId)?.products?.name}</Link>
                                            </ListItem>
                                            : null
                                        } </div>
                                    })
                                }</> : <ListItem>No Purchases</ListItem>
                                    }
                    </TableCell>
                    <TableCell>
                    {
                    allPurchases.find(z=> z.purchases?.customerId == item.customerId) != undefined ?

                    <>{
                      allPurchases.map((x,index)=>
                      {
                      return <div key={index}> {x.purchases?.customerId == item.customerId ?
                        <ListItem>

                      <>{x.purchases.orderDate}
                      </> 
                        </ListItem>: null

                      } </div>
                      })
                      }</> : <ListItem>No Purchases</ListItem>
                      }
                    </TableCell>
                  <TableCell>{item.customerId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>                      
      }
  <h4 onClick={() => navigate(-1)} style={{textDecoration: 'underline', cursor: 'pointer', color: '#1976D2'}}>Go Back</h4>
      </div>
    </div>
  )
}

export default CustomersComp