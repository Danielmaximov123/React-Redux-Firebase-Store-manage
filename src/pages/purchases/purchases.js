import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getCustomer } from "../../redux/actions/customerActions";
import { getPurchases } from "../../redux/actions/purchaseAction";
import { getProduct } from "../../redux/actions/ProductsActions";
import {
  CircularProgress,
  TableContainer,
  Paper,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  ListItem,
  Input,
} from "@mui/material";
import { useState, useEffect } from "react";

const PurcahsesComp = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const navigate = useNavigate();
  const {
    allCustomers,
    allPurchases,
    allProducts,
    productsLoading,
    customersLoading,
    purchasesLoading,
  } = useSelector(
    (state) => ({
      allPurchases: state.purchases.purchases,
      allCustomers: state.customers.customers,
      allProducts: state.products.products,
      customersLoading: state.customers.customersLoading,
      purchasesLoading: state.purchases.purchasesLoading,
      productsLoading: state.products.productsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if ((customersLoading, purchasesLoading, productsLoading)) {
      dispatch(getCustomer());
      dispatch(getPurchases());
      dispatch(getProduct());
    }
  }, [dispatch, allCustomers, allPurchases, allProducts]);

  let dateFromInput =
    new Date(date).getDate() +
    "/" +
    (new Date(date).getMonth() + 1) +
    "/" +
    new Date(date).getFullYear();


  return (
    <div className="main-customers">
      <h1>Purchases</h1>
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}>
        <Input type="date" onChange={(e) => setDate(e.target.value)}></Input>
      </div>
      <div>
        {purchasesLoading ? (
          <CircularProgress />
        ) : (
          <>
            <TableContainer
              component={Paper}
              style={{ marginLeft: "auto", marginRight: "auto", width: "30%" }}
            >
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>
                      Customer
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      Product
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allPurchases
                    .filter((item) => {
                      if (item.purchases.orderDate === dateFromInput) {
                        return item;
                      }
                    })
                    .map((item) => {
                      return (
                        <TableRow key={item.purchaseId}>
                          <TableCell style={{ textAlign: "center" }}>
                            {
                              <ListItem>
                                <Link
                                  to={
                                    "/customers/" + item.purchases?.customerId
                                  }
                                >
                                  {
                                    allCustomers.find(
                                      (per) =>
                                        per.customerId ===
                                        item.purchases?.customerId
                                    )?.customer?.fname
                                  }{" "}
                                  {
                                    allCustomers.find(
                                      (per) =>
                                        per.customerId ===
                                        item.purchases?.customerId
                                    )?.customer?.lname
                                  }
                                </Link>
                              </ListItem>
                            }
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {
                              <ListItem>
                                <Link
                                  to={"/products/" + item.purchases?.productId}
                                >
                                  {
                                    allProducts.find(
                                      (pro) =>
                                        pro.productId ===
                                        item.purchases?.productId
                                    )?.products?.name
                                  }
                                </Link>
                              </ListItem>
                            }
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <ListItem>{item.purchases.orderDate}</ListItem>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <h4
          onClick={() => navigate(-1)}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "#1976D2",
          }}
        >
          Go Back
        </h4>
      </div>
    </div>
  );
};

export default PurcahsesComp;
