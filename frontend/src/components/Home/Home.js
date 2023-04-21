import "./Home.css"
import React, { Fragment } from 'react'
import Product from "./ProductCard.js"
import MetaData from "../layout/MetaData"
import { clearErrors, getProduct } from "../../actions/productAction"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"
// import {CgMouse} from "react-icons/all"


// const product={
//   name:"Green Shirt",
//   images:[{url: "https://i.ibb.co/DRST11n/1.webp"}],
//   price:"₹500",
//   id:"dhruv"
// }

const Home = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,products}=useSelector(
    (state)=>state.products
  )
  useEffect(() => {
    if(error){
       alert.error(error);
       dispatch(clearErrors());
    }
    dispatch(getProduct());
  
  }, [dispatch,error,alert])
  
  return (
   <Fragment>
    {loading ?(<Loader />):(
      <Fragment>
      <MetaData title="Ecommerce" />
      <div className="banner">
        <p>Welcome to Ecommmerce</p>
        <h1>Find Amaxing Products Below</h1>

        <a href="#container">
            <button>
                {/* Scroll <CgMouse /> */}
                Scroll
            </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
       {products && products.map((product)=> <Product product={product} />)}

      </div>

    </Fragment>
    )}
   </Fragment>
  )
}

export default Home
