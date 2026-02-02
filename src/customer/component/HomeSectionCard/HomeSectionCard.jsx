import React from 'react'

function HomeSectionCard1({product,section}) {
  return (
    <div className='flex '>
      <div className='cursor-pointer flex  flex-col items-center bg-yellow-50 rounded-lg shadow-2xl overflow-hidden w-[15rem] mx-3 h-100  my-2'>
            <div className='h-55 w-40  mt-5'>
                <img 
                className='object-cover object-top w-full h-full rounded-2xl '
                 src={product.image} 
                 alt="" />
            </div>

            <div className='p-4  mt-3' >
                <h3 className='text-lg font-medium text-gray-900'>{product.brand}</h3>
                <p className='mt-2 text-sm text-gray-500'>{product.title}</p>
            </div>
            
            

        </div>
    </div>
  )
}

export default HomeSectionCard1