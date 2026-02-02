import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './customer/component/Navigation/Navigation'
import HomePage from './customer/pages/Homepage/HomePage'
import Footer from './customer/component/Footer/Footer'
import Product from './customer/component/Product/Product'
import ProductDetail from './customer/component/ProductDetail/ProductDetail';
import Cart from './customer/component/Cart/Cart';
import CheckOut from './customer/component/CheckOut/CheckOut';
import Order from './customer/component/Order/Order';
import OrderDetail from './customer/component/Order/OrderDetail';
import CustomerRoutes from './Routes/CustomerRoutes';
import OrderCard from './customer/component/Order/OrderCard';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

        <Routes>
          <Route path='/*' element={<CustomerRoutes/>}></Route>

        </Routes>
        {/* <Navigation/> */}
          {/* <OrderDetail/> */}
          {/* <OrderCard/> */}

        {/* Hello E-commerce */}
        
        
        
      </div>
      
    </>
  )
}

export default App
