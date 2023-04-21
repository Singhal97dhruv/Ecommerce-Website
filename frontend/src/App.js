import './App.css';
import { useEffect,useState } from 'react';
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer"
import WebFont from "webfontloader"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import React from "react";
import Home from "./components/Home/Home.js"
import ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js"
import Search from "./components/Product/Search.js"
import LoginSignUp from './components/User/LoginSignUp';
import store from "./store"
import {loadUser} from "./actions/userAction"
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./components/User/Profile.js"
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/Cart/Cart.js"
import Shipping from "./components/Cart/Shipping.js"
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import Payment from "./components/Cart/Payment.js"
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./components/Cart/OrderSuccess.js"
import MyOrders from "./components/Order/MyOrders.js"
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/Admin/Dashboard"
import ProductList from "./components/Admin/ProductList.js"
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import NotFound from './components/layout/Not Found/NotFound';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
function App() {

  const {isAuthenticated,user}=useSelector(state=>state.user);
  const [stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


 useEffect(()=>{
  WebFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanka"]
    }
  })
  store.dispatch(loadUser());
  getStripeApiKey();
},[])

window.addEventListener("contextmenu",(e)=>e.preventDefault());

  return (
    <Router>

   <Header />
    {isAuthenticated && <UserOptions user={user}/>}
   <Routes>
   <Route  path="/" element={<Home />} />
   <Route  path="/product/:id" element={<ProductDetails />} />
   <Route path='/products' element={<Products/>} />
   <Route path='/search' element={<Search/>} />
   <Route path='/products/:keyword' element={<Products/>} />
   <Route path='/account' element={<Profile/>}/>
   <Route path='/login' element={<LoginSignUp/>} />
   <Route path='/me/update' element={<UpdateProfile/>}/>
   <Route path='/password/update' element={<UpdatePassword/>}/>
   <Route path='/password/forgot' element={<ForgotPassword/>}/>
   <Route path='/password/reset/:token' element={<ResetPassword/>}/>
   <Route path='/cart' element={<Cart/>}/>
  <Route path='/login/shipping' element={<Shipping/>}/>
    <Route path="/order/confirm" element={<ConfirmOrder/>}/>
    {stripeApiKey && (<Route path="/process/payment" element={(<Elements stripe={loadStripe(stripeApiKey)}> <Payment /></Elements>)}/>)}
   <Route path='/success' element={<OrderSuccess/>}/>
   <Route path='/orders' element={<MyOrders/>}/>
   <Route path='/order/:id' element={<OrderDetails/>}/>
   {/* <Route path='/admin/dashboard' element={<Dashboard/>}/> */}
    {/* <ProtectedRoute path="/admin/dashboard" element={<Dashboard/>}/> */}
    {/* <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} component={Dashboard} />} /> */}
    {/* <Route element={<RequireAuth />}>
            <Route path="/protected" element={<ProtectedPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}

    <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
    <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>}/>
    <Route path='/admin/product' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>}/>
    <Route path='/admin/product/:productId' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
    <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>}/>
    <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><ProcessOrder/></ProtectedRoute>}/>
    <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UsersList/></ProtectedRoute>}/>
    <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
    <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ProductReviews/></ProtectedRoute>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>

   <Route path='*' element={<NotFound/>}/>
    
    
   {/* <Route  path="/product/:id" render={(props)=> <ProductDetails {...props} />} /> */}

   {/* <Route exact path="/product/:id" component={ProductDetails} /> */}

   </Routes>
   <Footer />
    </Router>
  );
}

export default App;
