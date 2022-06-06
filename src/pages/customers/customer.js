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
import firebase from '../../firebaseApp';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import CustomerPageEdit from './editCustomer';
import AddPurchaseCustomer from './addProductCustomer';
import { customertDel, getCustomer } from '../../redux/actions/customerActions';
import { purchaseDel , getPurchases } from '../../redux/actions/purchaseAction';
import { getProduct } from '../../redux/actions/ProductsActions';
import { toast } from 'react-toastify';

const CustomerComp = () => {
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
  const [addProduct, setAddProduct] = useState(false)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  
  const currentCustomer = allCustomers.find((customers) => customers?.customerId === id);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(customertDel(currentCustomer.customerId));
    allPurchases.forEach(purchase => {
      if(purchase.purchases.customerId === id) {
        dispatch(purchaseDel(purchase.purchaseId))
      }
    })
    toast.success( currentCustomer?.customer?.fname + " " + currentCustomer?.customer?.lname + " deleted successfully!")
    navigate('/customers')
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (customersLoading , productsLoading) {
      dispatch(getCustomer());
      dispatch(getProduct());
    }
  }, [dispatch]);

  useEffect(() => {
    if (purchasesLoading) {
      dispatch(getPurchases());
    }
  }, [dispatch , allPurchases]);


  return (
    <div>
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: '46%', position: 'absolute', float : "right"}}>
            <h4 onClick={() => navigate(-1)} style={{textDecoration: 'underline', cursor: 'pointer', color: '#1976D2'}}>Go Back</h4>
        </div>
       
      {customersLoading ? 
      <CircularProgress />
      : <div>
        <h1 style={{textAlign : "center"}}>{currentCustomer?.customer?.fname} {currentCustomer?.customer?.lname}</h1>
      <div style={{float: 'left',width: '50%',textAlign: 'center'}}>
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
          Wants to delete {currentCustomer?.customer?.fname} {currentCustomer?.customer?.lname}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          As soon as you click "yes" the customer will delete and with it all his data.
          Are you sure you want to delete {currentCustomer?.customer?.fname} {currentCustomer?.customer?.lname}
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
        <h3>Customer Details</h3>
        <h4 style={{margin : "3px"}}>First Name : {currentCustomer?.customer.fname}</h4> <br/>
        <h4 style={{margin : "3px"}}>Last Name : {currentCustomer?.customer.lname}</h4> <br/>
        <h4 style={{margin : "3px"}}>City : {currentCustomer?.customer.city}</h4> <br/>
          </> :
          <CustomerPageEdit setShowEdit={setShowEdit}/> 
        }
          </Card> 
      </div>
      </div>

      <div style={{float: 'right', width: '50%'}}>
      <div style={{width: '40%' , paddingLeft: '10rem'}}>
      <Card variant="outlined" style={{paddingLeft: '1rem' ,paddingRight: '1rem' }}>
      {
          !addProduct ?
          <>
            <IconButton style={{position: 'absolute',display: 'block',marginLeft: '1rem',marginTop: '0.5rem'}}
              aria-label="edit"
              onClick={() => setAddProduct(true)}
              >
              <AddIcon style={{color : "blue"}}/>
            </IconButton>
          </> :
          <>
          <IconButton style={{position: 'absolute',display: 'block',marginLeft: '1rem',marginTop: '0.5rem'}}
            aria-label="edit"
            onClick={() => setAddProduct()}
            >
            <ArrowBackIcon style={{color : "blue"}}/>
          </IconButton>
        </>
        }
      {!addProduct ? <>
        <h3>Purchases</h3>
        { allPurchases.find(find => find.purchases?.customerId == currentCustomer?.customerId) ? 
        <TableContainer>
            <Table>
            <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
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
                                        {buyer.purchases?.customerId == id ?
                                            <ListItem>
                                            <ListItemButton>              
                                                <Link to={"/products/"+ buyer.purchases?.productId}>{allProducts.find(i=> i?.productId == buyer.purchases?.productId )?.products.name}</Link>
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
                        {x.purchases?.customerId == id ?
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
        </TableContainer> :
        <Alert style={{marginBottom : "1.5rem" , marginTop : "1.5rem"}} variant="outlined" severity="error">
        There are no products for the customer.
        </Alert>
        } </>
        :
        <AddPurchaseCustomer setAddProduct={setAddProduct}/>
      }
      </Card>
      </div>
      </div>
      </div>
      }
    </div>
  );
};

export default CustomerComp;
