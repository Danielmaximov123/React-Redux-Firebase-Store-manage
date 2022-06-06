import React from 'react'
import { addNewCustomer } from '../../../redux/actions/customerActions'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
const ariaLabel = { "aria-label": "description" };

const AddCustomer = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [city, setCity] = useState("")
    const dispatch = useDispatch()
    const { customersLoading } = useSelector(state => ({customersLoading : state.customers.productsLoading}))

    const handleSubmit =  (e) => {
        e.preventDefault()
        if(!fname) {
          return toast.error("Please enter your First Name")
        }  
        if(!lname) {
          return toast.error("Please enter your Last Name")
        }  
        if(!lname) {
          return toast.error("Please enter your City")
        }  
          const data = 
          {
            fname : fname,
            lname : lname, 
            city : city
          }
          dispatch(addNewCustomer(data)).then(
           () => {
             navigate("/customers")
            }
          )
    }


  return (
    <div>
        <h4 onClick={() => navigate(-1)} style={{textDecoration: 'underline', cursor: 'pointer', color: '#1976D2'}}>Go Back</h4>

        <h3>Add New Customer</h3>
        First Name : <Input  name="fname" inputProps={ariaLabel} onChange={e => setFname(e.target.value)}/> <br/>
        Last Name : <Input  name="lname" inputProps={ariaLabel} onChange={e => setLname(e.target.value)}/> <br/>
        City : <Input  name="city" inputProps={ariaLabel} onChange={e => setCity(e.target.value)}/> <br/>
        {!customersLoading ?
        <>
        <Button onClick={handleSubmit} color="success" sx={{padding: '5px 10px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} variant="contained"  startIcon={<AddIcon />}>
              Add New Customer
        </Button>
        </> 
        :
        <>
        <LoadingButton sx={{padding: '5px 10px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} loading variant="outlined">
          Adding
        </LoadingButton>
        </>
        }
    </div>
    )}
export default AddCustomer