// file: components/PaymentSuccess/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { updatePaymentRequest } from "../../../State/Payment/Action";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "../Order/OrderTracker";

function PaymentSuccess() {
  const { orderId } = useParams();
  const navigate    = useNavigate();
  const dispatch    = useDispatch();

  const [paymentId, setPaymentId]       = useState(null);
  const [paymentLinkId, setPaymentLinkId] = useState(null);
  const [showConfetti, setShowConfetti]  = useState(false);

  const { order } = useSelector((store) => store.order);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentId(params.get("razorpay_payment_id"));
    setPaymentLinkId(params.get("razorpay_payment_link_id"));
    // trigger confetti burst after mount
    setTimeout(() => setShowConfetti(true), 100);
    setTimeout(() => setShowConfetti(false), 3500);
  }, []);

  useEffect(() => {
    if (paymentId && paymentLinkId) {
      dispatch(updatePaymentRequest({ orderId, paymentId, paymentLinkId }))
        .then(() => dispatch(getOrderById(orderId)));
    }
  }, [paymentId, paymentLinkId, orderId, dispatch]);

  // Confetti dots config
  const confettiDots = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    color: ["#0d9488","#14b8a6","#f59e0b","#34d399","#60a5fa","#f472b6","#a78bfa"][i % 7],
    left: `${(i * 3.7) % 100}%`,
    delay: `${(i * 0.09).toFixed(2)}s`,
    size: `${6 + (i % 5)}px`,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

        .ps-root {
          font-family: 'Nunito', sans-serif;
          background: linear-gradient(160deg, #f0fdfb 0%, #f5fff9 40%, #fafffe 100%);
          min-height: 100vh;
          padding: 0 0 80px;
        }

        /* ── Confetti ── */
        .ps-confetti-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 0;
          pointer-events: none;
          z-index: 999;
          overflow: visible;
        }
        .ps-confetti-dot {
          position: absolute;
          top: -10px;
          border-radius: 2px;
          opacity: 0;
          animation: confettiFall 3s ease-in forwards;
        }
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);    opacity: 1; }
          100% { transform: translateY(100vh) rotate(540deg); opacity: 0; }
        }

        /* ── Hero banner ── */
        .ps-hero {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 60%, #064e3b 100%);
          padding: 52px 40px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        /* Decorative rings */
        .ps-hero::before, .ps-hero::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .ps-hero::before { width: 340px; height: 340px; top: -120px; right: -80px; }
        .ps-hero::after  { width: 220px; height: 220px; bottom: -90px; left: -60px; }

        .ps-hero-check {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
          backdrop-filter: blur(4px);
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .ps-hero-check-inner {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .ps-hero-title {
          font-family: 'Sora', sans-serif;
          font-size: 2rem; font-weight: 800;
          color: #fff; margin-bottom: 8px;
          animation: fadeUp 0.5s 0.15s both;
        }
        .ps-hero-sub {
          font-size: 1rem; color: rgba(255,255,255,0.8);
          animation: fadeUp 0.5s 0.25s both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Order meta pills */
        .ps-meta-strip {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap;
          margin-top: 24px;
          animation: fadeUp 0.5s 0.35s both;
        }
        .ps-meta-pill {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(4px);
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 0.8rem; font-weight: 600; color: #fff;
        }
        .ps-meta-pill-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #34d399;
        }

        /* ── Body container ── */
        .ps-body {
          max-width: 860px; margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Tracker section ── */
        .ps-tracker-wrap {
          background: #fff;
          border-radius: 20px;
          padding: 28px 28px 24px;
          margin-top: -28px; /* overlap hero slightly */
          box-shadow: 0 8px 36px rgba(13, 148, 136, 0.1);
          animation: fadeUp 0.5s 0.4s both;
          position: relative;
          z-index: 1;
        }
        .ps-section-label {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #0d9488; margin-bottom: 16px;
          display: flex; align-items: center; gap: 7px;
        }
        .ps-section-label::before {
          content: '';
          display: inline-block; width: 8px; height: 8px;
          border-radius: 50%; background: #0d9488;
        }

        /* ── Items section ── */
        .ps-items-wrap {
          margin-top: 20px;
          display: flex; flex-direction: column; gap: 16px;
          animation: fadeUp 0.5s 0.5s both;
        }

        .ps-item-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          display: grid;
          grid-template-columns: auto 1fr auto;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ps-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 34px rgba(0,0,0,0.09);
        }

        /* Image column */
        .ps-item-img-wrap {
          width: 110px;
          background: #f0fdfb;
          flex-shrink: 0;
          overflow: hidden;
        }
        .ps-item-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        /* Info column */
        .ps-item-info {
          padding: 20px 22px;
          display: flex; flex-direction: column; justify-content: center;
          gap: 8px; min-width: 0;
        }
        .ps-item-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem; font-weight: 700;
          color: #0f172a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ps-item-desc {
          font-size: 0.78rem; color: #64748b;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ps-item-price {
          display: inline-flex; align-items: center; gap: 4px;
          background: #f0fdfb;
          color: #0d9488;
          font-family: 'Sora', sans-serif;
          font-size: 1rem; font-weight: 700;
          padding: 4px 12px; border-radius: 8px;
          align-self: flex-start;
        }

        /* Address column */
        .ps-item-address {
          width: 240px;
          flex-shrink: 0;
          background: linear-gradient(160deg, #f8fffe 0%, #f0fdf9 100%);
          padding: 18px 20px;
          display: flex; flex-direction: column; justify-content: center;
          gap: 6px;
        }
        .ps-addr-label {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #0d9488; margin-bottom: 4px;
        }

        /* ── CTA strip ── */
        .ps-cta {
          display: flex; gap: 14px; flex-wrap: wrap;
          justify-content: center;
          margin-top: 32px;
          animation: fadeUp 0.5s 0.6s both;
        }
        .ps-cta-primary {
          padding: 13px 32px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #0d9488, #14b8a6);
          color: #fff; font-family: 'Nunito', sans-serif;
          font-size: 0.9rem; font-weight: 700; cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 5px 18px rgba(13,148,136,0.3);
        }
        .ps-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 9px 26px rgba(13,148,136,0.42);
        }
        .ps-cta-secondary {
          padding: 13px 28px; border-radius: 14px; border: none;
          background: #f0fdfb; color: #0d9488;
          font-family: 'Nunito', sans-serif;
          font-size: 0.9rem; font-weight: 700; cursor: pointer;
          transition: all 0.2s;
        }
        .ps-cta-secondary:hover { background: #ccfbf1; }

        @media (max-width: 700px) {
          .ps-hero { padding: 40px 20px 50px; }
          .ps-hero-title { font-size: 1.5rem; }
          .ps-item-card { grid-template-columns: 1fr; }
          .ps-item-img-wrap { width: 100%; height: 180px; }
          .ps-item-address { width: 100%; }
          .ps-body { padding: 0 14px; }
          .ps-tracker-wrap { padding: 20px 14px; }
        }
      `}</style>

      <div className="ps-root">

        {/* ── Confetti ── */}
        {showConfetti && (
          <div className="ps-confetti-wrap">
            {confettiDots.map(d => (
              <div
                key={d.id}
                className="ps-confetti-dot"
                style={{
                  left: d.left,
                  width: d.size,
                  height: d.size,
                  background: d.color,
                  animationDelay: d.delay,
                }}
              />
            ))}
          </div>
        )}

        {/* ── Hero ── */}
        <div className="ps-hero">
          <div className="ps-hero-check">
            <div className="ps-hero-check-inner">✓</div>
          </div>
          <h1 className="ps-hero-title">Payment Successful!</h1>
          <p className="ps-hero-sub">
            Your order has been placed and is being prepared 🎉
          </p>

          <div className="ps-meta-strip">
            {orderId && (
              <div className="ps-meta-pill">
                <span className="ps-meta-pill-dot" />
                Order #{orderId}
              </div>
            )}
            {paymentId && (
              <div className="ps-meta-pill">
                <span className="ps-meta-pill-dot" />
                Payment ID: {paymentId.slice(0, 14)}…
              </div>
            )}
            <div className="ps-meta-pill">
              <span className="ps-meta-pill-dot" />
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="ps-body">

          {/* Tracker */}
          <div className="ps-tracker-wrap">
            <p className="ps-section-label">Order Status</p>
            <OrderTracker activeStep={1} />
          </div>

          {/* Items */}
          {order?.orderItems?.length > 0 && (
            <div className="ps-items-wrap">
              <p className="ps-section-label" style={{ marginTop: 12 }}>
                Items in this Order ({order.orderItems.length})
              </p>

              {order.orderItems.map((item) => (
                <div key={item.id} className="ps-item-card">

                  {/* Image */}
                  <div className="ps-item-img-wrap">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title || "product"}
                    />
                  </div>

                  {/* Info */}
                  <div className="ps-item-info">
                    <p className="ps-item-title">{item.product.title}</p>
                    {item.product.description && (
                      <p className="ps-item-desc">{item.product.description}</p>
                    )}
                    <span className="ps-item-price">₹ {item.discountedPrice}</span>
                  </div>

                  {/* Address */}
                  <div className="ps-item-address">
                    <p className="ps-addr-label">📍 Delivering To</p>
                    <AddressCard address={order.shippingAddress} />
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="ps-cta">
            <button className="ps-cta-primary" onClick={() => navigate(`/account/order/${orderId}`)}>
              📦 View Order Details
            </button>
            <button className="ps-cta-secondary" onClick={() => navigate("/")}>
              Continue Shopping →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;