import React, { useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';
import { data } from 'react-router-dom';
function CartItem({item}) {
    const dispatch = useDispatch();
    const [qty,setQty] = useState(item.quantity);

    const handleUpdateCartItem = (num) =>{
        const newQty = qty + num;
        if(newQty<1) return;
        setQty(newQty);

        dispatch(updateCartItem(
            {cartItemId : item.id,
                data:{quantity:newQty}
            }))

        // const data = {data:{quantity:item.quantity+num} ,  cartItemId: item?.id};
        // console.log("update data",data);
        // dispatch(updateCartItem(data));
    }
    const handleRemoveCartItem = () =>{
        dispatch(removeCartItem(item.id))
    }

    useEffect(()=>{
        setQty(item.quantity);
        console.log("item quantity  ",item.quantity);
    },[item.quantity])

    return (
        <div className='p-5 shadow-lg  rounded-md'>
            <div className='flex items-center'>
                <div className='w-[5reem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img className='w-full h-full object-cover object-top' src={item.product.imageUrl} alt="" />
                </div>
                <div className='ml-5 space-y-1'>
                    <p className='font-semibold'>{item.product.title}</p>
                    <p className='opacity-70'>Size: {item.size}</p>
                    <p className='opacity-70 mt-2'>Seller: {item.product.brand}</p>
                    <div className='lg:flex items-center lg:space-x-10 pt-4'>
                        <div className=''>
                            <IconButton onClick={()=>{handleUpdateCartItem(-1)}} disabled={qty<=1}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <span className='py-1 px-7 border rounded-sm'>{qty}</span>
                            <IconButton onClick={()=>{handleUpdateCartItem(1)}} sx={{ color: 'RGB(145 85 253' }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                        <div>
                            <Button onClick={()=>{handleRemoveCartItem()}} sx={{ color: 'RGB(145 85 253' }}>Remove</Button>
                        </div>
                    </div>
                    <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                        <p className="text-3xl font-semibold tracking-tight text-gray-900">Rs.{item.product.discountedPrice}</p>
                        <p className="text-xl tracking-tight text-gray-400 line-through">Rs.{item.price}</p>
                        <p className="text-xl tracking-tight text-green-600 font-medium">{item.product.discountPercent}% off</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CartItem