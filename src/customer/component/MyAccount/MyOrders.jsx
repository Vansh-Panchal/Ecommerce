import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../State/Order/Action";
// import { getOrderHistory } from "../../State/Order/Action";

const MyOrders = () => {

  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ status: "" }));
  }, [dispatch]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#333",
          fontWeight: "600",
        }}
      >
        My Orders
      </h2>

      {order?.orders?.length === 0 && (
        <p style={{ color: "#777" }}>No orders found.</p>
      )}

      {order?.orders?.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            border: "1px solid #eee",
          }}
        >
          {/* Order Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: "600" }}>
                Order ID: #{item.id}
              </p>

              <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#e6f4ea",
                color: "#2e7d32",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              {item.orderStatus}
            </div>
          </div>

          {/* Order Items */}
          {item.orderItems?.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                borderTop: "1px solid #eee",
                paddingTop: "10px",
                marginTop: "10px",
              }}
            >
              <img
                src={product.product.imageUrl}
                alt=""
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "15px",
                }}
              />

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: "0",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {product.product.title}
                </p>

                <p
                  style={{
                    margin: "2px 0",
                    color: "#777",
                    fontSize: "14px",
                  }}
                >
                  Quantity: {product.quantity}
                </p>
              </div>

              <div
                style={{
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                ₹{product.price}
              </div>
            </div>
          ))}

          {/* Order Footer */}
          <div
            style={{
              marginTop: "15px",
              borderTop: "1px solid #eee",
              paddingTop: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: "600",
              }}
            >
              Total
            </p>

            <p
              style={{
                margin: 0,
                fontWeight: "700",
                color: "#1976d2",
              }}
            >
              ₹{item.totalPrice}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;