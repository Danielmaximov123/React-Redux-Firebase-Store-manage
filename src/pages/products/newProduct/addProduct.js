import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../../../redux/actions/ProductsActions';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
const ariaLabel = { "aria-label": "description" };

const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const dispatch = useDispatch()
    const { productsLoading } = useSelector(state => ({productsLoading : state.products.productsLoading}))

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name) {
          return toast.error("Please enter your Name")
        }  
        if(!price) {
          return toast.error("Please enter your Price")
        }  
        if(!quantity) {
          return toast.error("Please enter your Quantity")
        }  
          const data = 
          {
            name : name,
            price : price, 
            quantity : quantity
          }
          dispatch(addNewProduct(data)).then(() => {
            navigate("/products")
          })
          
    }


  return (
    <div>
        <h3>Add New Product</h3>
        Name : <Input  name="name" inputProps={ariaLabel} onChange={e => setName(e.target.value)}/> <br/>
        Price : <Input  type='number' name="price" inputProps={ariaLabel} onChange={e => setPrice(e.target.value)}/> <br/>
        Quantity : <Input  type='number' id="filled-number" name="quantity" inputProps={ariaLabel} onChange={e => setQuantity(e.target.value)}/> <br/> 
        {!productsLoading ?
        <>
        <Button onClick={handleSubmit} color="success" sx={{padding: '5px 10px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} variant="contained"  startIcon={<AddIcon />}>
              Add New Product
        </Button>
        </> :
        <>
        <LoadingButton sx={{padding: '5px 10px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} loading variant="outlined">
        Adding
        </LoadingButton>
        </>
        }
          <h4 onClick={() => navigate(-1)} style={{textDecoration: 'underline', cursor: 'pointer', color: '#1976D2'}}>Go Back</h4>

    </div>
  
    )}
export default AddProduct