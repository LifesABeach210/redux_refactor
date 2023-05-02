import React, { useState, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import productReducer from "./reducers/productReducer";
import ProductCard from "./components/ProductCard";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import {
  deleteProduct,
  editProduct,
  addBlank,
  addApi,
} from "../src/redux/productSlice";
function App() {
  const dispatch = useDispatch();
  let productState = useSelector((state) => state.product);

  const getData = async () => {
    const response = await fetch("http://localhost:3001/api/products");
    dispatch(addApi());
  };

  return (
    <div className="App">
      <h1>Video Game Products</h1>

      <button onClick={() => dispatch(addBlank())}>Add Blank Card</button>

      <button onClick={() => dispatch(addApi())}>ADD API</button>

      {/* <button
      onClick={
        () => dispatch({
          type: "ADD_PAYLOAD",
          payload: payload
        })
      }>Payload</button> */}
      <button onClick={() => getData()}>Payload</button>
      {productState.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            publisher={product.publisher}
            genre={product.genre}
            price={product.price}
            //pass in dispatch for DELETE_PRODUCT
            deleteProduct={(id) => dispatch(deleteProduct(id))}
            editProduct={(editProductObj) =>
              dispatch(
                editProduct({
                  data: editProductObj,
                })
              )
            }
          />
        );
      })}
    </div>
  );
}

export default App;
