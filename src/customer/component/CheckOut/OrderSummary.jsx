import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getOrderById } from '../../../State/Order/Action'
import { store } from '../../../State/store'
import { createPayment } from '../../../State/Payment/Action'
import PaymentSuccess from '../Payment/PaymentSuccess'

function OrderSummary() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const { order } = useSelector(store => store)

  const handleCheckout = () => {
    if (!orderId)
      console.log("Id missing");
    dispatch(createPayment(orderId))
  }

  useEffect(() => {
    dispatch(getOrderById(orderId))
    console.log("order id in summary ", order);
  }, [orderId])

  return (
    <div>
      <div className='p-5 shadow-lg rounded-s-md border'>
        <AddressCard address={order.order?.shippingAddress} />
      </div>
      <div>
        <div className='lg:grid grid-cols-3 lg:px-16 relative'>
          <div className='col-span-2'>
            {order.order?.orderItems?.map((item) => <CartItem item={item} />)}

          </div>
          <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
            <div className='sticky mt-10'>
              <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
              <hr />
              <div className='space-y-3 font-semibold'>
                <div className='flex justify-between pt-3 text-black'>
                  <span>Price</span>
                  <span>Rs.{order.order?.totalPrice}</span>

                </div>
                <div className='flex justify-between pt-3 text-black'>
                  <span>Discount</span>
                  <span className='text-green-600'>-Rs.{order.order?.discount}</span>

                </div>
                <div className='flex justify-between pt-3 text-black'>
                  <span>Delivery Charge</span>
                  <span className='text-green-600'>Free</span>

                </div>
                <div className='flex justify-between pt-3 text-black'>
                  <span>Total Amount</span>
                  <span className='text-green-600'>Rs.{order.order?.totalDiscountedPrice}</span>

                </div>
              </div>
              <Button variant='contained' className='w-full' sx={{ mt: '2rem', px: '2rem', py: '1rem', bgcolor: '#9155fd' }}
                onClick={handleCheckout}>

                CheckOut
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary