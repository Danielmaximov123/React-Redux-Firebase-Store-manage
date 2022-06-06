import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Input } from '@mui/material';
import { toast } from 'react-toastify';
import { customerUpdate , getCustomer } from '../../redux/actions/customerActions';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
const ariaLabel = { "aria-label": "description" };


const CustomerPageEdit = ({setShowEdit}) => {
    const { id } = useParams()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [city, setCity] = useState("")
    const dispatch = useDispatch()

    const { customers, customersLoading } = useSelector(
      (state) => ({
        customers: state.customers.customers,
        customersLoading : state.customers.customersLoading,
      }),
      shallowEqual
    );

    const currentCustomer = customers.find(item => item.customerId === id && item)

    useEffect(() => {
      if (customersLoading) {
        dispatch(getCustomer());
      }
        if(currentCustomer) {
            setFname(currentCustomer.customer.fname)
            setLname(currentCustomer.customer.lname)
            setCity(currentCustomer.customer.city)
        }
    }, [dispatch, currentCustomer])

    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!fname || !lname || !city) {
        return toast.warning("Please fill in all fields!");
      }
  
      const data = { fname, lname, city };
      dispatch(customerUpdate(currentCustomer.customerId, data));
      toast.success("Customer Details Updated Successfully!!");
      setShowEdit() 
    };

  return (
    <div style={{paddingBottom: '2rem' , paddingRight: '1rem'}}>
        <h3>Edit Customer</h3>
        First Name : <Input multiline value={fname} name="fname" inputProps={ariaLabel} onChange={e => setFname(e.target.value)}/> <br/>
        Last Name : <Input multiline value={lname} name="lname" inputProps={ariaLabel} onChange={e => setLname(e.target.value)}/> <br/>
        City : <Input multiline value={city} name="city" inputProps={ariaLabel} onChange={e => setCity(e.target.value)}/> <br/>
        <Button onClick={handleSubmit} color="success" sx={{padding: '5px 10px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} variant="contained"  startIcon={<SaveIcon />}>
              Save the new Details
        </Button>        
    </div>
  )
}

export default CustomerPageEdit