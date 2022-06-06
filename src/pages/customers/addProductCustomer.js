import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { doPurchase } from '../../redux/actions/purchaseAction';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useNavigate } from 'react-router-dom';


const AddPurchaseCustomer = ({setAddProduct}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const { products } = useSelector(state => ({ products : state.products.products }))
    const { purchasesLoading } = useSelector(state => ({ purchasesLoading : state.purchases.purchasesLoading }))
    const [productId, setProductId] = useState("")
    const dispatch = useDispatch()


    const handleSubmitProduct = (e) => {
      e.preventDefault()
      if(!productId) {
        return toast.error("Please Add Products")
      }  
        const data = 
        {
          productId : productId,
          customerId : id, 
          orderDate : new Date().getDate() + "/" + (new Date().getMonth() + 1) +  "/" + new Date().getFullYear()
        }
        dispatch(doPurchase(data)).then(() => {
          setAddProduct()
        })
    }



  return (
    <div >
      <h3>Purchases</h3>
    <FormControl >
  <FormLabel id="demo-radio-buttons-group-label">Add Product</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"  
    name="radio-buttons-group"
  >
    {
      products.map(item => {
        return  <FormControlLabel key={item.productId} value={item.products.name} control={<Radio />} label={item.products.name} onChange={(e) => setProductId(item.productId)}/>
      })
    }
  </RadioGroup>
        
        {!purchasesLoading ? 
          <Button onClick={handleSubmitProduct} color="success" sx={{padding: '5px 10px', marginTop: '5px',marginBottom: '0.5rem', marginLeft: 'auto', marginRight: 'auto'}} variant="contained"  startIcon={<AddIcon />}>
              Add Product
        </Button> :
        <LoadingButton sx={{padding: '5px 10px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} loading variant="outlined">
        Adding
      </LoadingButton>

        }
  </FormControl>
    </div>
  )
}

export default AddPurchaseCustomer