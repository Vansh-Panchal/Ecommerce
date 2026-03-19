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
import ReviewProduct from '../customer/component/RateAndReview/ReviewProduct'
import Profile from '../customer/component/MyAccount/Profile'
import ProductSearch from '../customer/component/Product/ProductSearch'
import SearchResultsPage from '../customer/component/Product/SearchResultsPage'

function CustomerRoutes() {
  return (
    <div>
      <Navigation/>

      <Routes>

        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product/>}/>
        <Route path="/product/:productId" element={<ProductDetail/>}/>
        <Route path="/products/search" element={<SearchResultsPage />} />
        <Route path="/checkout" element={<CheckOut/>}/>
        <Route path="/account/order" element={<Order/>}/>
        <Route path="/account/order/:orderId" element={<OrderDetail/>}/>
        <Route path="/account/rate/:productId" element={<ReviewProduct />} />
        <Route path="/payment/:orderId" element={<PaymentSuccess/>}/>
        <Route path="/account/*" element={<Profile/>} />

      </Routes>

      <Footer/>
    </div>
  );
}

export default CustomerRoutes