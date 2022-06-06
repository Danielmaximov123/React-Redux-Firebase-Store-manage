import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Redux
import { createStore , applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from "redux-thunk";
import { combineReducers } from 'redux';
import purchasesReducer from './redux/reducers/purchasesReducers';
import customersReduces from './redux/reducers/customersReduces';
import productsReduces from './redux/reducers/productsReducers';

// Router
import { BrowserRouter } from 'react-router-dom'

const reducer = combineReducers({
  customers : customersReduces,
  products : productsReduces,
  purchases : purchasesReducer
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const appStore = createStore(reducer,composedEnhancer)

ReactDOM.render(
  <BrowserRouter>
  <Provider store={appStore}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

