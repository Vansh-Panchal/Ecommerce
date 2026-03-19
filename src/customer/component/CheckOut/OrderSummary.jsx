import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getOrderById } from '../../../State/Order/Action'
import { store } from '../../../State/store'
import { createPayment } from '../../../State/Payment/Action'

function OrderSummary() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const { order } = useSelector(store => store)

  const handleCheckout = () => {
    if (!orderId) console.log("Id missing");
    dispatch(createPayment(orderId))
  }

  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:wght@500;600&display=swap');

        .os-root {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #f5f3ff 0%, #fdf6f0 50%, #f0faf5 100%);
          min-height: 100vh;
          padding: 28px 28px 60px;
        }

        /* ── Address card ── */
        .os-address-wrap {
          background: linear-gradient(135deg, #f0edff 0%, #fdf5ff 100%);
          border-radius: 20px;
          padding: 22px 26px;
          margin-bottom: 28px;
          box-shadow: 0 4px 20px rgba(124, 92, 252, 0.1);
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .os-address-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c5cfc, #a07cfe);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(124, 92, 252, 0.3);
        }
        .os-address-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7c5cfc;
          margin-bottom: 4px;
        }

        /* ── Main layout ── */
        .os-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }

        /* ── Cart items panel ── */
        .os-items-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .os-items-header {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9490b0;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .os-items-header::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2cb67d;
        }

        /* ── Price summary card ── */
        .os-summary-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(100, 80, 180, 0.1), 0 1px 4px rgba(0,0,0,0.04);
          position: sticky;
          top: 24px;
        }

        .os-summary-head {
          background: linear-gradient(135deg, #1e1b3a 0%, #2d2860 100%);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .os-summary-head-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }
        .os-summary-head-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: #a07cfe;
          background: rgba(124, 92, 252, 0.2);
          padding: 3px 10px;
          border-radius: 20px;
        }

        .os-summary-body { padding: 20px 24px; }

        .os-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 0;
          font-size: 0.87rem;
        }
        .os-price-row + .os-price-row {
          box-shadow: inset 0 1px 0 rgba(0,0,0,0.04);
        }
        .os-price-label {
          color: #6b6880;
          font-weight: 400;
        }
        .os-price-val {
          font-weight: 600;
          color: #1e1b3a;
        }
        .os-price-green {
          font-weight: 700;
          color: #2cb67d;
        }
        .os-price-free {
          font-size: 0.73rem;
          font-weight: 700;
          color: #2cb67d;
          background: #e8f8f2;
          padding: 3px 10px;
          border-radius: 20px;
        }

        /* Savings chip */
        .os-savings-chip {
          margin: 10px 0 14px;
          background: linear-gradient(135deg, #e8f8f2, #f0fff8);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.79rem;
          color: #1b8a5a;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(44, 182, 125, 0.12);
        }

        /* Total row */
        .os-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0 2px;
          margin-top: 6px;
          box-shadow: inset 0 2px 0 #f0edff;
        }
        .os-total-label {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #1e1b3a;
        }
        .os-total-val {
          font-family: 'Fraunces', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #1e1b3a;
        }

        /* Checkout button */
        .os-checkout-btn {
          width: 100%;
          margin-top: 18px;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #7c5cfc 0%, #5b3fe0 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.87rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 5px 18px rgba(124, 92, 252, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .os-checkout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 26px rgba(124, 92, 252, 0.45);
        }

        /* Trust strip */
        .os-trust {
          display: flex;
          justify-content: space-between;
          margin-top: 18px;
          padding-top: 18px;
          box-shadow: inset 0 1px 0 rgba(0,0,0,0.04);
        }
        .os-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          flex: 1;
        }
        .os-trust-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
        .os-trust-text {
          font-size: 0.6rem;
          color: #9490b0;
          font-weight: 500;
          text-align: center;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .os-layout { grid-template-columns: 1fr; }
          .os-summary-card { position: static; }
          .os-root { padding: 16px 16px 48px; }
        }
      `}</style>

      <div className="os-root">

        {/* ── Delivery Address ── */}
        <div className="os-address-wrap">
          <div className="os-address-icon">📍</div>
          <div>
            <p className="os-address-label">Delivering To</p>
            <AddressCard address={order.order?.shippingAddress} />
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="os-layout">

          {/* Items */}
          <div className="os-items-panel">
            <div className="os-items-header">
              Order Items ({order.order?.orderItems?.length || 0})
            </div>
            {order.order?.orderItems?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Price summary */}
          <div className="os-summary-card">
            <div className="os-summary-head">
              <span className="os-summary-head-title">Price Details</span>
              <span className="os-summary-head-tag">
                {order.order?.orderItems?.length || 0} items
              </span>
            </div>

            <div className="os-summary-body">

              <div className="os-price-row">
                <span className="os-price-label">Total MRP</span>
                <span className="os-price-val">₹{order.order?.totalPrice}</span>
              </div>

              <div className="os-price-row">
                <span className="os-price-label">Discount</span>
                <span className="os-price-green">− ₹{order.order?.discount}</span>
              </div>

              <div className="os-price-row">
                <span className="os-price-label">Delivery</span>
                <span className="os-price-free">FREE</span>
              </div>

              {order.order?.discount > 0 && (
                <div className="os-savings-chip">
                  🎉 You're saving <strong>₹{order.order?.discount}</strong> on this order!
                </div>
              )}

              <div className="os-total-row">
                <span className="os-total-label">Total</span>
                <span className="os-total-val">₹{order.order?.totalDiscountedPrice}</span>
              </div>

              <button className="os-checkout-btn" onClick={handleCheckout}>
                Proceed to Payment →
              </button>

              <div className="os-trust">
                {[
                  { icon: '🔒', bg: '#f0edff', text: 'Secure\nPayment' },
                  { icon: '↩️', bg: '#fff8e8', text: 'Easy\nReturns'  },
                  { icon: '✅', bg: '#e8f8f2', text: 'Authentic\nProducts' },
                ].map(t => (
                  <div key={t.text} className="os-trust-item">
                    <div className="os-trust-icon" style={{ background: t.bg }}>
                      {t.icon}
                    </div>
                    <span className="os-trust-text">
                      {t.text.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default OrderSummary;