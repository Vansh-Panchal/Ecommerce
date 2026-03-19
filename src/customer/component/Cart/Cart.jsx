import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';

function Cart() {
  const { cart } = useSelector((store) => store);
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  const handleCheckOut = () => navigate("/checkout?step=2");

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, cart.updateCartItem, cart.deleteCartItem]);

  const itemCount      = cart.cart?.cartItems?.length || 0;
  const totalPrice     = cart.cart?.totalPrice || 0;
  const discount       = cart.cart?.discount || 0;
  const totalFinal     = cart.cart?.totalDiscountedPrice || 0;
  const discountPct    = totalPrice > 0
    ? Math.round((discount / totalPrice) * 100)
    : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');

        .cart-root {
          --cream:       #faf8f5;
          --warm-white:  #ffffff;
          --sand:        #f0ede8;
          --sand-dark:   #e8e3db;
          --gold:        #c9a84c;
          --gold-light:  #f5e9c8;
          --green:       #2e7d32;
          --green-bg:    #e8f5e9;
          --ink:         #1a1a2e;
          --ink-soft:    #4a4a5e;
          --ink-muted:   #8a8a9a;
          --red:         #e05252;
          --red-bg:      #fff0f0;
          --border:      rgba(0,0,0,0.07);
          --shadow-sm:   0 2px 12px rgba(0,0,0,0.05);
          --shadow-md:   0 8px 28px rgba(0,0,0,0.08);
          --radius:      16px;
          font-family: 'Jost', sans-serif;
          background: var(--cream);
          min-height: 100vh;
          padding-bottom: 60px;
        }

        /* ── Page header ── */
        .cart-header {
          background: var(--warm-white);
          padding: 24px 40px;
          display: flex;
          align-items: baseline;
          gap: 14px;
        }
        .cart-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
        }
        .cart-header-count {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--ink-muted);
          background: var(--sand);
          padding: 3px 10px;
          border-radius: 20px;
        }

        /* ── Layout ── */
        .cart-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 40px;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: start;
        }

        /* ── Empty state ── */
        .cart-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 40px;
          background: var(--warm-white);
          border-radius: var(--radius);
        }
        .cart-empty-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
          opacity: 0.4;
        }
        .cart-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .cart-empty-sub {
          font-size: 0.88rem;
          color: var(--ink-muted);
          margin-bottom: 28px;
        }
        .cart-empty-btn {
          display: inline-block;
          padding: 12px 32px;
          background: var(--ink);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .cart-empty-btn:hover {
          background: var(--gold);
          box-shadow: 0 6px 20px rgba(201,168,76,0.35);
          transform: translateY(-1px);
        }

        /* ── Items panel ── */
        .cart-items-panel {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cart-items-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .cart-items-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .cart-continue-link {
          font-size: 0.78rem;
          color: var(--gold);
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s;
          background: none;
          border: none;
        }
        .cart-continue-link:hover { opacity: 0.7; }

        /* ── Summary panel ── */
        .cart-summary {
          position: sticky;
          top: 24px;
          background: var(--warm-white);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .cart-summary-head {
          background: var(--ink);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cart-summary-head-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .cart-summary-head-items {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--gold);
        }

        .cart-summary-body { padding: 20px 24px; }

        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          font-size: 0.88rem;
          color: var(--ink-soft);
        }
        .cart-summary-row-label { font-weight: 400; }
        .cart-summary-row-val   { font-weight: 600; color: var(--ink); }
        .cart-summary-row-green {
          font-weight: 700;
          color: var(--green);
        }
        .cart-summary-row-free {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--green);
          background: var(--green-bg);
          padding: 2px 8px;
          border-radius: 20px;
        }

        /* Savings banner */
        .cart-savings-banner {
          margin: 14px 0;
          background: var(--green-bg);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--green);
          font-weight: 600;
        }

        /* Total row */
        .cart-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0 4px;
          margin-top: 4px;
        }
        .cart-total-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink);
        }
        .cart-total-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--ink);
        }

        /* Checkout button */
        .cart-checkout-btn {
          width: 100%;
          margin-top: 18px;
          padding: 15px;
          border-radius: 12px;
          border: none;
          background: var(--ink);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(26,26,46,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .cart-checkout-btn:hover {
          background: var(--gold);
          box-shadow: 0 6px 20px rgba(201,168,76,0.4);
          transform: translateY(-1px);
        }

        /* Trust strip */
        .cart-trust {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 16px;
        }
        .cart-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .cart-trust-icon { font-size: 1rem; }
        .cart-trust-text {
          font-size: 0.62rem;
          color: var(--ink-muted);
          font-weight: 500;
          text-align: center;
          line-height: 1.3;
        }

        /* Promo hint */
        .cart-promo-hint {
          margin-top: 14px;
          padding: 10px 14px;
          background: var(--gold-light);
          border-radius: 10px;
          font-size: 0.75rem;
          color: #7a5c0a;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cart-header { padding: 20px; }
          .cart-body {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 20px;
          }
          .cart-summary { position: static; }
        }
        @media (max-width: 480px) {
          .cart-header { padding: 16px; }
          .cart-body   { padding: 16px; }
          .cart-header-title { font-size: 1.6rem; }
        }
      `}</style>

      <div className="cart-root">

        {/* ── Page header ── */}
        <div className="cart-header">
          <h1 className="cart-header-title">Your Cart</h1>
          {itemCount > 0 && (
            <span className="cart-header-count">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        <div className="cart-body">

          {/* ── Empty state ── */}
          {itemCount === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <p className="cart-empty-title">Your cart is empty</p>
              <p className="cart-empty-sub">
                Looks like you haven't added anything yet.
              </p>
              <button
                className="cart-empty-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* ── Cart items ── */}
              <div className="cart-items-panel">
                <div className="cart-items-header">
                  <span className="cart-items-label">
                    {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                  </span>
                  <button
                    className="cart-continue-link"
                    onClick={() => navigate("/")}
                  >
                    ← Continue Shopping
                  </button>
                </div>

                {cart.cart?.cartItems?.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* ── Order Summary ── */}
              <div className="cart-summary">

                {/* Header */}
                <div className="cart-summary-head">
                  <span className="cart-summary-head-title">Order Summary</span>
                  <span className="cart-summary-head-items">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="cart-summary-body">

                  {/* Price rows */}
                  <div className="cart-summary-row">
                    <span className="cart-summary-row-label">
                      MRP ({itemCount} items)
                    </span>
                    <span className="cart-summary-row-val">
                      ₹{totalPrice}
                    </span>
                  </div>

                  <div className="cart-summary-row">
                    <span className="cart-summary-row-label">
                      Discount {discountPct > 0 && (
                        <span style={{
                          fontSize: '0.7rem',
                          background: '#fff0f0',
                          color: '#e05252',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          marginLeft: 6,
                          fontWeight: 700
                        }}>
                          {discountPct}% off
                        </span>
                      )}
                    </span>
                    <span className="cart-summary-row-green">
                      − ₹{discount}
                    </span>
                  </div>

                  <div className="cart-summary-row">
                    <span className="cart-summary-row-label">
                      Delivery Charges
                    </span>
                    <span className="cart-summary-row-free">FREE</span>
                  </div>

                  {/* Savings banner */}
                  {discount > 0 && (
                    <div className="cart-savings-banner">
                      🎉 You're saving <strong>₹{discount}</strong> on this order!
                    </div>
                  )}

                  {/* Total */}
                  <div className="cart-total-row">
                    <span className="cart-total-label">Total</span>
                    <span className="cart-total-val">₹{totalFinal}</span>
                  </div>

                  {/* Checkout button */}
                  <button
                    className="cart-checkout-btn"
                    onClick={handleCheckOut}
                  >
                    Proceed to Checkout →
                  </button>

                  {/* Promo hint */}
                  <div className="cart-promo-hint">
                    ✨ Free delivery on this order!
                  </div>

                  {/* Trust strip */}
                  <div className="cart-trust">
                    {[
                      { icon: "🔒", text: "Secure\nPayment"  },
                      { icon: "↩️", text: "Easy\nReturns"   },
                      { icon: "✅", text: "Authentic\nProducts" },
                    ].map(t => (
                      <div key={t.text} className="cart-trust-item">
                        <span className="cart-trust-icon">{t.icon}</span>
                        <span className="cart-trust-text">
                          {t.text.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;