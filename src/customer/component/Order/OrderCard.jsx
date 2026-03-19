import React from "react";
import { Grid } from "@mui/material";
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
    const navigate = useNavigate();

    // Safely access the first item's details
    const firstItem = order?.orderItems?.[0];

    return (
        <div 
            onClick={() => navigate(`/account/order/${order?.id}`)} 
            className="p-5 shadow-md hover:shadow-2xl border rounded-md cursor-pointer transition-all"
        >
            <Grid container  spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={12}>
                    <div className="flex">
                        <img
                            className="h-[5rem] w-[5rem] object-cover rounded"
                            src={firstItem?.product?.imageUrl}
                            alt={firstItem?.product?.title}
                        />
                        <div className="ml-5 space-y-2">
                            <p className="font-medium">{firstItem?.product?.title}</p>
                            <p className="opacity-50 text-sm font-semibold">Size: {firstItem?.size}</p>
                            <p className="opacity-50 text-sm font-semibold">Color: {firstItem?.product?.color}</p>
                            {order?.orderItems?.length > 1 && (
                                <p className="text-xs text-blue-600">
                                    + {order.orderItems.length - 1} more items
                                </p>
                            )}
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <p className="font-semibold text-lg">Rs. {order?.totalPrice}</p>
                </Grid>

                <Grid item xs={4}>
                    {/* Status Logic based on your backend values: PLACED, SHIPPED, DELIVERED */}
                    <div>
                        <p className="flex items-center">
                            <AdjustIcon 
                                sx={{ width: '15px', height: '15px' }} 
                                className={`${
                                    order?.orderStatus === "DELIVERED" ? "text-green-600" : "text-orange-500"
                                } mr-2`} 
                            />
                            <span className="font-medium">
                                {order?.orderStatus === "DELIVERED" 
                                    ? `Delivered on ${new Date(order?.deliveryDate).toLocaleDateString()}` 
                                    : `Status: ${order?.orderStatus}`}
                            </span>
                        </p>

                        <p className="text-xs mt-2 opacity-70">
                            {order?.orderStatus === "DELIVERED" 
                                ? "Your item has been delivered" 
                                : "Your order is being processed"}
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default OrderCard;