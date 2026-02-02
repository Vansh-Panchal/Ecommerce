import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';


function Cart() {

  const {cart} = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  }
  useEffect(() => {
    dispatch(getCart())
    console.log("cart item", cart.quantity);

  }, [dispatch])

  useEffect(() => {
    if (cart)
      console.log("cart items", cart.cart?.totalPrice);

    

  }, [cart])

  return (
    <div>
      <div className='lg:grid grid-cols-3 lg:px-16 relative'>
        <div className='col-span-2'>
          {/* {[1, 1, 1, 1, 1, 1].map((item) => <CartItem />)} */}
          {cart.cart?.cartItems?.map((item) => <CartItem key={item.id} item={item} />)}


        </div>
        <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
          <div className='sticky mt-10'>
            <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
            <hr />
            <div className='space-y-3 font-semibold'>
              <div className='flex justify-between pt-3 text-black'>
                <span>Price</span>
                <span>Rs.{cart.cart?.totalPrice}</span>

              </div>
              <div className='flex justify-between pt-3 text-black'>
                <span>Discount</span>
                <span className='text-green-600'>-Rs.{cart.cart?.discount}</span>

              </div>
              <div className='flex justify-between pt-3 text-black'>
                <span>Delivery Charge</span>
                <span className='text-green-600'>Free</span>

              </div>
              <div className='flex justify-between pt-3 text-black'>
                <span>Total Amount</span>
                <span className='text-green-600'>Rs.{cart.cart?.totalDiscountedPrice}</span>

              </div>
            </div>
            <Button onClick={handleCheckOut} variant='contained' className='w-full' sx={{ mt: '2rem', px: '2rem', py: '1rem', bgcolor: '#9155fd' }}>
              CheckOut
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart