import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { doPurchase } from '../../redux/actions/purchaseAction';
import { getProduct , downQuantity } from '../../redux/actions/ProductsActions';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';


const AddBuyers = ({setAddBuyer}) => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const { customers } = useSelector(state => ({ customers : state.customers.customers }))
    const {products} = useSelector(state => ({products : state.products.products})) 
    const { purchasesLoading } = useSelector(state => ({ purchasesLoading : state.purchases.purchasesLoading }))
    const { productsLoading } = useSelector(state => ({ productsLoading : state.products.productsLoading }))
    const [customerId, setCustomerId] = useState("")
    const dispatch = useDispatch()

    const currentProducts = products.find((products) => products?.productId === id)

    useEffect(() => {
      if (productsLoading) {
        dispatch(getProduct());
      }
        if(currentProducts) {
          setName(currentProducts.products.name)
          setPrice(currentProducts.products.price)
          setQuantity(currentProducts.products.quantity)
        }
    }, [dispatch, currentProducts])

    const handleSubmitProduct = (e) => {
      e.preventDefault()
      if(!customerId) {
        return toast.error("Please Choose Customer")
      } 
      const data = 
      { 
        productId : id,
        customerId : customerId, 
        orderDate :  new Date().getDate() + "/" + (new Date().getMonth() + 1) +  "/" + new Date().getFullYear()
      }
      const productData = { id, name, price, quantity };
      dispatch(downQuantity(productData))
      dispatch(doPurchase(data)).then(() => {
        setAddBuyer()
      })
    }


  return (
    <div >
      <h3>Customers who purchased</h3>
    <FormControl >
  <FormLabel id="demo-radio-buttons-group-label">Add Buyer</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"  
    name="radio-buttons-group"
  >
    {
      customers.map(item => {
        return  <FormControlLabel key={item.customerId} value={item.customer.fname + " " + item.customer.lname} control={<Radio />} label={item.customer.fname + " " + item.customer.lname} onChange={(e) => setCustomerId(item.customerId)}/>
      })
    }
  </RadioGroup>  
        {!purchasesLoading ? 
          <Button onClick={handleSubmitProduct} color="success" sx={{padding: '5px 10px', marginTop: '5px',marginBottom: '0.5rem', marginLeft: 'auto', marginRight: 'auto'}} variant="contained"  startIcon={<AddIcon />}>
              Add Buyer
        </Button> :
        <LoadingButton sx={{padding: '5px 10px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} loading variant="outlined">
        Adding
      </LoadingButton>

        }  
</FormControl>
    </div>
  )
}

export default AddBuyers