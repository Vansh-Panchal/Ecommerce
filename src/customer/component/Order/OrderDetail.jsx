import React, { useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';

function OrderDetail() {
  const navigate    = useNavigate();
  const dispatch    = useDispatch();
  const { orderId } = useParams();
  const { order }   = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const statusSteps = {
    PLACED: 0, CONFIRMED: 1, SHIPPED: 2,
    OUT_FOR_DELIVERY: 3, DELIVERED: 4,
  };
  const activeStep = statusSteps[order.order?.orderStatus] ?? 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap');

        .od-root {
          font-family: 'Jost', sans-serif;
          background: #faf8f5;
          min-height: 100vh;
          padding: 32px 40px 60px;
        }

        .od-top {
          max-width: 960px;
          margin: 0 auto 0;
        }

        .od-addr-wrap {
          background: #fff;
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .od-tracker-wrap {
          background: #fff;
          border-radius: 14px;
          padding: 28px 24px;
          margin-bottom: 28px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .od-items {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .od-item-card {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: box-shadow 0.2s;
        }
        .od-item-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); }

        .od-item-img {
          width: 90px; height: 100px;
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          background: #f0ede8;
        }
        .od-item-img img {
          width: 100%; height: 100%;
          object-fit: contain;
          display: block;
        }

        .od-item-info { flex: 1; min-width: 0; }
        .od-item-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1.4;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .od-item-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 6px;
        }
        .od-meta-chip {
          font-size: 0.72rem;
          color: #6b7280;
          background: #f3f4f6;
          padding: 2px 8px;
          border-radius: 20px;
          font-weight: 500;
        }
        .od-item-seller {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-bottom: 4px;
        }
        .od-item-price {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .od-rate-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          background: #fffcf2;
          color: #8a6a1a;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(201,168,76,0.15);
        }
        .od-rate-btn:hover {
          background: #c9a84c;
          color: #fff;
          box-shadow: 0 4px 12px rgba(201,168,76,0.3);
          transform: translateY(-1px);
        }
        .od-rate-btn svg { font-size: 1rem !important; }

        @media (max-width: 700px) {
          .od-root { padding: 20px 16px 48px; }
          .od-item-card { flex-wrap: wrap; }
          .od-rate-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="od-root">
        <div className="od-top">
          <div className="od-addr-wrap">
            <AddressCard address={order.order?.shippingAddress} />
          </div>
          <div className="od-tracker-wrap">
            <OrderTracker activeStep={activeStep} />
          </div>
        </div>

        <div className="od-items">
          {order.order?.orderItems?.map((item) => (
            <div key={item.id} className="od-item-card">

              <div className="od-item-img">
                <img src={item.product.imageUrl} alt={item.product.title} />
              </div>

              <div className="od-item-info">
                <p className="od-item-title">{item.product.title}</p>
                <div className="od-item-meta">
                  {item.product.color && (
                    <span className="od-meta-chip">Color: {item.product.color}</span>
                  )}
                  {item.size && item.size !== "ONE SIZE" && (
                    <span className="od-meta-chip">Size: {item.size}</span>
                  )}
                </div>
                <p className="od-item-seller">Seller: {item.product.brand}</p>
                {/* ✅ Show order item's actual discounted price */}
                <p className="od-item-price">₹{item.discountedPrice?.toLocaleString()}</p>
              </div>

              {/* ✅ Pass the order item's price via navigation state */}
              <button
                className="od-rate-btn"
                onClick={() =>
                  navigate(`/account/rate/${item.product.id}`, {
                    state: { itemPrice: item.discountedPrice },
                  })
                }
              >
                <StarIcon style={{ fontSize: '1rem' }} />
                Rate & Review
              </button>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderDetail;