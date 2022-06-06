import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getCustomer } from '../../redux/actions/customerActions';
import { getPurchases , purchaseDel } from '../../redux/actions/purchaseAction';
import { getProduct } from '../../redux/actions/ProductsActions';
import AddBuyers from './addBuyersr';
import ProductPageEdit from './editProduct';
import { productsDel } from './../../redux/actions/ProductsActions';
import { toast } from 'react-toastify';


const ProductComp = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { allCustomers , allPurchases , allProducts , productsLoading , customersLoading , purchasesLoading } = useSelector(state => ({
    allPurchases : state.purchases.purchases,
    allCustomers : state.customers.customers,
    allProducts : state.products.products,
    customersLoading : state.customers.customersLoading,
    purchasesLoading : state.purchases.purchasesLoading,
    productsLoading : state.products.productsLoading
  }),
  shallowEqual
  )
  const [showEdit, setShowEdit] = useState(false)
  const [addBuyer, setAddBuyer] = useState(false)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(productsDel(currentProducts.productId));
    allPurchases.forEach(purchase => {
      if(purchase.purchases.productId === id) {
        dispatch(purchaseDel(purchase.purchaseId))
      }
    })
    toast.success( currentProducts?.products?.name + " deleted successfully!")
    navigate('/products')
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentProducts = allProducts.find((products) => products?.productId === id)
  const purchasesLength = allPurchases.filter(item => item.purchases?.productId === id).length


  useEffect(() => {
    if (customersLoading , productsLoading) {
      dispatch(getCustomer());
      dispatch(getProduct());
    }
  }, [dispatch]);

  useEffect(() => {
    if (purchasesLoading ) {
      dispatch(getPurchases());
      dispatch(getProduct());
    }
  }, [dispatch , allPurchases ]);



  return (
    <div>
      <div style={{marginLeft: 'auto', marginRight: 'auto', width: '46%', position: 'absolute', float : "right"}}>
       <h4 onClick={() => navigate(-1)} style={{textDecoration: 'underline', cursor: 'pointer', color: '#1976D2'}}>Go Back</h4>
        </div>
       
      {productsLoading ? 
      <CircularProgress />
      : <div>
        <h1 style={{textAlign : "center"}}>{currentProducts?.products?.name}</h1>
      <div style={{float : "left" , width : "50%"}}>
        <div style={{width: '40%', paddingLeft: '23rem'}}>
        <Card variant="outlined">
        {
          !showEdit ?
          <>
            <IconButton style={{position: 'absolute',display: 'block',marginLeft: '1rem',marginTop: '0.5rem'}}
              aria-label="edit"
              onClick={() => setShowEdit(true)}
              >
              <EditIcon style={{color : "blue"}}/>
            </IconButton>
            <IconButton variant="outlined" onClick={handleClickOpen} style={{position: 'absolute',display: 'block',marginLeft: '1rem',marginTop: '3rem',color: 'red'}}>
              <DeleteIcon/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          Wants to delete {currentProducts?.products?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          As soon as you click "yes" the product will delete and with it all his data.
          Are you sure you want to delete {currentProducts?.products?.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog> 
          </> :
          <>
          <IconButton style={{position: 'absolute',display: 'block',marginLeft: '1rem',marginTop: '0.5rem'}}
            aria-label="edit"
            onClick={() => setShowEdit()}
            >
            <ArrowBackIcon style={{color : "blue"}}/>
          </IconButton>
        </>
        }
        { !showEdit ? <>
        <h3>Product Details</h3>
        <h4 style={{margin : "3px"}}>Product Name : {currentProducts?.products?.name}</h4> <br/>
        <h4 style={{margin : "3px"}}>Price : {currentProducts?.products?.price}$</h4> <br/>
        <h4 style={{margin : "3px"}}>Quantity : {currentProducts?.products?.quantity}</h4> <br/>
          </> :
          <ProductPageEdit setShowEdit={setShowEdit}/> 
        }
          </Card> 
      </div>
      </div>

      <div style={{float : "right" , width : "50%"}}>
      <div style={{width: '40%' , paddingLeft: '10rem'}}>
      <Card variant="outlined" style={{paddingLeft: '1rem' ,paddingRight: '1rem' }}>
      {
          !addBuyer ?
          <>
            <IconButton style={{position: 'absolute',display: 'block',marginLeft: '1rem',marginTop: '0.5rem'}}
              aria-label="edit"
              onClick={() => setAddBuyer(true)}
              >
              <AddIcon style={{color : "blue"}}/>
            </IconButton>
          </> :
          <>
          <IconButton style={{position: 'absolute',display: 'block',marginLeft: '1rem',marginTop: '0.5rem'}}
            aria-label="edit"
            onClick={() => setAddBuyer()}
            >
            <ArrowBackIcon style={{color : "blue"}}/>
          </IconButton>
        </>
        }
      {!addBuyer ? <>
        <h3>Customers who purchased</h3>
        { allPurchases.find(find => find.purchases?.productId == id) ? 
        <TableContainer style={{marginBottom : "1rem"}}>
          <Table>
            <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Purchase Date</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell  >
                                
                                <>{
                                  allPurchases.map((buyer , index)=>
                                    {
                                        return <div key={index}> 
                                        {buyer.purchases?.productId == id ?
                                            <ListItem>
                                            <ListItemButton>              
                                                <Link to={"/customers/"+ buyer.purchases?.customerId}>{allCustomers.find(per => per.customerId === buyer.purchases?.customerId)?.customer?.fname}</Link>
                                            </ListItemButton> 
                                            </ListItem> : null
                                        } </div>
                                    })
                                }</>     
              </TableCell>
              <TableCell>

                    <>{
                      allPurchases.map((x , index)=>
                      {
                        return <div key={index}> 
                        {x.purchases?.productId == id ?
                          <ListItem>
                          <ListItemButton style={{ backgroundColor: 'transparent' }} >{x.purchases.orderDate}
                      </ListItemButton> 
                            </ListItem>: null
                      } </div>
                    })
                  }</>
                
                    </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {
            purchasesLength > 0 ? 
            <b>Total amount of purchases: {purchasesLength * currentProducts.products.price}$</b>
            : null
          }
        </TableContainer> :
        <Alert style={{marginBottom : "1.5rem" , marginTop : "1.5rem"}} variant="outlined" severity="error">
        There are no Purchases for this Product.
        </Alert>
        } </>
        :
        <AddBuyers setAddBuyer={setAddBuyer}/>
      }
      </Card>
      </div>
      </div>
      </div>
      }
    </div>
  );
};

export default ProductComp;
