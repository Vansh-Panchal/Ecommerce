import React from 'react'
import { Grid, Box } from '@mui/material'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { deepPurple } from '@mui/material/colors'
import { StarIcon } from '@heroicons/react/24/outline'

function OrderDetail() {
  return (
    <div className='px-5 lg:px-20'>
      {/* Delivery Address Section */}
      <div className='border p-5'>
        <h1 className='font-bold text-lg py-7'>Delivery Address</h1>
        <AddressCard />
      </div>

      {/* Order Tracker Section */}
      <div className='py-20'>
        <OrderTracker activeStep={3} />
      </div>

      {/* Product Details Section */}
      <div className='w-full space-y-5 '>
        {[1,1,1,1,1,1,1,1].map((item,index)=><Box
          className='hover:shadow-lg hover:shadow-gray-40000 rounded-md  bg-white p-5'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* LEFT: Product Info */}
          <div className='flex items-center'>
            <img
              className='w-[10rem] h-[10rem] object-cover object-top rounded-md'
              src='https://m.media-amazon.com/images/I/71E2bDjJ3RL._AC_UY1100_.jpg'
              alt='Product'
            />
            <div className='space-y-2 ml-5'>
              <p className='font-semibold text-lg'>
                CaraCola Women's Banarasi Style Saree
              </p>
              <p className='text-sm text-gray-600 space-x-5'>
                <span>Color: Blue</span>
                <span>Size: M</span>
              </p>
              <p className='text-sm text-gray-600'>Seller: Linaria</p>
              <p className='font-semibold text-gray-800'>Price: ₹1000</p>
            </div>
          </div>

          {/* RIGHT: Review Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: deepPurple[500],
              '&:hover': { textDecoration: 'underline' },
              flexShrink: 0,
            }}
          >
            <StarIcon className='h-6 w-6 mr-2 text-purple-600' />
            <span className='font-medium'>Rate & Review Product</span>
          </Box>
        </Box>)}
        
      </div>
    </div>
  )
}

export default OrderDetail
