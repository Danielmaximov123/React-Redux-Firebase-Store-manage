import { Button, CircularProgress,  ListItem, ListItemButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCustomer  } from '../../redux/actions/customerActions';
import { getPurchases  } from '../../redux/actions/purchaseAction';
import { getProduct } from '../../redux/actions/ProductsActions';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const ProductsComp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { allCustomers , allPurchases , allProducts ,productsLoading , customersLoading , purchasesLoading  } = useSelector(
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
      <div className="main-customers">
          <h1>Products</h1>
          <div style={{marginLeft: 'auto', marginRight: 'auto',width: '50%'}}>
          <Button onClick={()=> navigate("/new-product")} style={{marginRight: '49.5rem', marginBottom : "5px"}} variant="outlined" startIcon={<AddIcon />}>
          Add Product
        </Button>
          </div>
        <div>
        {productsLoading ? <CircularProgress /> :
          <TableContainer
          component={Paper}
          style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
          >
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>Product Name</TableCell>
                <TableCell style={{ textAlign: "center" }}>Customers purchased</TableCell>
                <TableCell style={{ textAlign: "center" }}>Purchased Date</TableCell>
                <TableCell style={{ textAlign: "center" }}>Product Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map((item , index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                  <ListItemButton>
                  <Link to={"/products/" + item?.productId}>{item?.products?.name}</Link>
                  </ListItemButton>
                  </TableCell>
                  <TableCell>
                    {allPurchases.find(find => find?.purchases?.productId === item?.productId) !== undefined ?

                          <>{
                            allPurchases.map((buyer,index)=> {
                              return <div key={index}> 
                                        {
                                          buyer.purchases?.productId === item?.productId ?
                                          <ListItem>
                                                <Link to={"/customers/"+ buyer.purchases?.customerId}>{allCustomers.find(per => per.customerId === buyer.purchases?.customerId)?.customer?.fname} {allCustomers.find(per => per.customerId === buyer.purchases?.customerId)?.customer?.lname}</Link>
                                            </ListItem>
                                            : null
                                        } </div>
                                      })
                                }</> : <ListItem>No Purchases</ListItem>  
                                
                              }

                    </TableCell>
                    <TableCell>
                    {
                      allPurchases.find(z=> z.purchases?.productId == item.productId) != undefined ?
                      
                      <>{
                        allPurchases.map((x,index)=>
                        {
                          return <div key={index}> 
                          {x.purchases?.productId === item.productId ?
                            <ListItem>

                      <>{x.purchases.orderDate}
                      </>   
                        </ListItem>: null

                      } </div>
                      })
                      }</> : <ListItem>No Purchases</ListItem>
                      }
                    </TableCell>
                  <TableCell>{item.productId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>                      
        }
        <ul>
        </ul>
        <h4 onClick={() => navigate(-1)} style={{textDecoration: 'underline', cursor: 'pointer', color: '#1976D2'}}>Go Back</h4>
      </div>
    </div>
  )
}

export default ProductsComp