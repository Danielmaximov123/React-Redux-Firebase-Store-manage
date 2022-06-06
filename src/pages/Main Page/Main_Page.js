import ProductComp from "./../products/product";
import ProductsComp from "./../products/products";
import CustomersComp from "./../customers/customers";
import CustomerComp from "./../customers/customer";
import HomePage from './home';
import { Route, Routes } from "react-router-dom";
import PurcahsesComp from './../purchases/purchases';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AddCustomer from './../customers/newCustomer/addcustomer';
import AddProduct from './../products/newProduct/addProduct';

const MainPage = () => {
  return (
    <div>
      <ToastContainer autoClose={2000}/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
            <Route path='/customers' element={<CustomersComp/>}/>
            <Route path='/new-customer' element={<AddCustomer/>}/>
            <Route path='/customers/:id' element={<CustomerComp/>}/>

        <Route path='/products' element={<ProductsComp/>}/>
        <Route path='/new-product' element={<AddProduct/>}/>
        <Route path='/products/:id' element={<ProductComp/>}/>

        <Route path='/purchases' element={<PurcahsesComp/>}/>
        <Route path='/purchases/:id'/>
      </Routes>
    </div>
  );
};

export default MainPage;
