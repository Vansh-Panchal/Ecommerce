import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../customer/component/Cart/Cart'
import Navigation from '../customer/component/Navigation/Navigation'
import Footer from '../customer/component/Footer/Footer'
import Product from '../customer/component/Product/Product'
import HomePage from '../customer/pages/Homepage/HomePage'
import ProductDetail from '../customer/component/ProductDetail/ProductDetail'
import CheckOut from '../customer/component/CheckOut/CheckOut'
import Order from '../customer/component/Order/Order'
import OrderDetail from '../customer/component/Order/OrderDetail'
import PaymentSuccess from '../customer/component/Payment/PaymentSuccess'


function CustomerRoutes() {
  return (
    <div>
        <div>
            <Navigation/>
        </div>
        <Routes>
            <Route path="/login" element={<HomePage/>}></Route>
            <Route path="/register" element={<HomePage/>}></Route>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product/>}></Route>
            <Route path="/product/:productId" element={<ProductDetail/>}></Route>
            <Route path="/checkout" element={<CheckOut/>}></Route>
            <Route path="/account/order" element={<Order/>}></Route>
            <Route path="/account/order/:orderId" element={<OrderDetail/>}></Route>
            <Route path="/payment/:orderId" element={<PaymentSuccess/>}></Route>


           
      
        {/* <Order/> */}
        {/* <OrderDetail/> */}
        
        </Routes>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default CustomerRoutes