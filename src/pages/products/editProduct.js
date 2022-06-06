import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Input } from '@mui/material';
import { toast } from 'react-toastify';
import { getProduct , productUpdate} from '../../redux/actions/ProductsActions';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
const ariaLabel = { "aria-label": "description" };


const ProductPageEdit = ({setShowEdit}) => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()

    const { products, productsLoading } = useSelector(
      (state) => ({
        products: state.products.products,
        productsLoading : state.products.productsLoading,
      }),
      shallowEqual
    );

    const currentProducts = products.find(item => item.productId === id)

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

    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!name || !price || !quantity) {
        return toast.warning("Please fill in all fields!");
      }
  
      const data = { name, price, quantity };
      dispatch(productUpdate(currentProducts.productId, data));
      toast.success("Product Details Updated Successfully!!");
      setShowEdit() 
    };

  return (
    <div style={{paddingBottom: '2rem' , paddingRight: '1rem'}}>
        <h3>Edit Product</h3>
        Name : <Input multiline value={name} name="name" inputProps={ariaLabel} onChange={e => setName(e.target.value)}/> <br/>
        Price : <Input type='number' value={price} name="price" inputProps={ariaLabel} onChange={e => setPrice(e.target.value)}/> <br/>
        Quantity : <Input type='number' value={quantity} name="quantity" inputProps={ariaLabel} onChange={e => setQuantity(e.target.value)}/> <br/>
        <Button onClick={handleSubmit} color="success" sx={{marginLeft: '10rem',
marginTop: '0.5rem'}} variant="contained"  startIcon={<SaveIcon />}>
              Update
        </Button>        
    </div>
  )
}

export default ProductPageEdit