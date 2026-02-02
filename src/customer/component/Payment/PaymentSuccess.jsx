// file: components/PaymentSuccess/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { updatePaymentRequest } from "../../../State/Payment/Action";
import { Alert, AlertTitle } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "../Order/OrderTracker";

function PaymentSuccess() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [paymentId, setPaymentId] = useState(null);
  const [paymentLinkId, setPaymentLinkId] = useState(null);
  const { order } = useSelector((store) => store.order);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentId(params.get("razorpay_payment_id"));
    // important: capture the payment link id
    setPaymentLinkId(params.get("razorpay_payment_link_id"));
  }, []);

  useEffect(() => {
    // wait until we have both ids before calling backend
    if (paymentId && paymentLinkId) {
      dispatch(updatePaymentRequest({ orderId, paymentId, paymentLinkId }))
        .then(() => dispatch(getOrderById(orderId)));
    }
  }, [paymentId, paymentLinkId, orderId, dispatch]);

  return (
    <div className="px-4 lg:px-36">
      <Alert variant="filled" severity="success" className="mt-6 mb-6 ">
        <AlertTitle>Payment Successful</AlertTitle>
        Your order has been placed successfully 🎉
      </Alert>

      <OrderTracker activeStep={1} />

      {order?.orderItems?.map((item) => (
        <div
          key={item.id}
          className="flex items-start justify-between gap-6 border border-gray-300 p-5 mt-6 rounded"
        >
          {/* Left: Image */}
          <div className="flex-shrink-0">
            <img
              src={item.product.imageUrl}
              alt={item.product.title || "product image"}
              className="w-20 h-24 md:w-28 md:h-32 object-cover rounded-sm"
            />
          </div>

          {/* Middle: product details (grows) */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
              {item.product.title}
            </h3>
            {item.product.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.product.description}
              </p>
            )}
            <div className="mt-3 text-sm md:text-base font-bold text-gray-900">
              ₹ {item.discountedPrice}
            </div>
          </div>

          {/* Right: AddressCard (fixed width) */}
          <div className="flex-shrink-0 w-72">
            <AddressCard address={order.shippingAddress} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentSuccess;