import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainCarousel } from '../../component/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../component/HomeSectionCarousel/HomeSectionCarousel';
import { getProductsByCategory } from '../../../State/Product/Action';
import { useNavigate } from 'react-router-dom';

const FOOTWEAR_SLUGS = [
  "casual_shoes", "formal_shoes", "sneakers",
  "sandals", "boots", "heels", "flats",
  "kids_sneakers", "kids_sandals", "kids_school_shoes",
  "kids_flip_flops", "kids_boots",
];

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryProducts = useSelector(
    (store) => store.products?.categoryProducts
  ) || {};

  useEffect(() => {
    dispatch(getProductsByCategory("mens_kurta"));
    dispatch(getProductsByCategory("kurtas"));
    dispatch(getProductsByCategory("watches"));
    FOOTWEAR_SLUGS.forEach((slug) => dispatch(getProductsByCategory(slug)));
  }, [dispatch]);

  const allFootwear = FOOTWEAR_SLUGS.flatMap(
    (slug) => categoryProducts?.[slug] || []
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .hp-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf8f5;
          min-height: 100vh;
        }

        .hp-carousel-wrap { position: relative; }

        /* ── Promo strip ── */
        .hp-promo-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          background: #1a1a2e;
          padding: 10px 16px;
          overflow: hidden;
        }
        .hp-promo-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
          font-weight: 400;
        }
        .hp-promo-icon { color: #c9a84c; font-size: 1rem; }
        .hp-promo-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        /* ── Main content ── */
        .hp-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 48px 24px 64px;
          display: flex;
          flex-direction: column;
          gap: 56px;
        }

        /* ── Divider ── */
        .hp-section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e0d8 30%, #e5e0d8 70%, transparent);
        }

        /* ── Mid banner ── */
        .hp-mid-banner {
          border-radius: 20px;
          background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%);
          padding: 36px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          overflow: hidden;
          position: relative;
        }
        .hp-mid-banner::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(201,168,76,0.08);
        }
        .hp-mid-banner::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 40%;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(201,168,76,0.05);
        }
        .hp-banner-text { position: relative; z-index: 1; }
        .hp-banner-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a84c;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .hp-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .hp-banner-sub { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
        .hp-banner-btn {
          position: relative; z-index: 1;
          padding: 12px 28px;
          border-radius: 30px;
          background: #c9a84c;
          color: #1a1408;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .hp-banner-btn:hover {
          background: #e8c96a;
          box-shadow: 0 6px 20px rgba(201,168,76,0.4);
          transform: translateY(-1px);
        }

        /* ── Trust bar ── */
        .hp-trust {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 8px;
        }
        .hp-trust-item {
          border-radius: 14px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.05);
          padding: 20px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hp-trust-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 10px;
          background: #f7f4ef;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }
        .hp-trust-label { font-size: 0.82rem; font-weight: 600; color: #1a1a2e; }
        .hp-trust-sub { font-size: 0.7rem; color: #aaa; margin-top: 1px; }

        @media (max-width: 900px) {
          .hp-trust { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .hp-content { padding: 32px 16px 48px; gap: 40px; }
          .hp-mid-banner { flex-direction: column; align-items: flex-start; padding: 28px 24px; }
          .hp-trust { grid-template-columns: 1fr 1fr; }
          .hp-promo-strip { gap: 20px; }
          .hp-banner-title { font-size: 1.3rem; }
          .hp-promo-dot { display: none; }
        }
      `}</style>

      <div className="hp-root">

        {/* Hero Carousel */}
        <div className="hp-carousel-wrap">
          <MainCarousel />
        </div>

        {/* Promo Strip */}
        <div className="hp-promo-strip">
          <div className="hp-promo-item"><span className="hp-promo-icon">🚚</span>Free delivery over ₹999</div>
          <div className="hp-promo-dot" />
          <div className="hp-promo-item"><span className="hp-promo-icon">↩️</span>Easy 30-day returns</div>
          <div className="hp-promo-dot" />
          <div className="hp-promo-item"><span className="hp-promo-icon">🔒</span>Secure payments</div>
          <div className="hp-promo-dot" />
          <div className="hp-promo-item"><span className="hp-promo-icon">✨</span>Authentic products</div>
        </div>

        <div className="hp-content">

          {/* ── Men's Kurta ── */}
          <HomeSectionCarousel
            data={categoryProducts?.mens_kurta || []}
            section="Men's Kurta"
            viewAllLink="/men/clothing/mens_kurta"   /* ✅ correct URL */
          />

          {/* ── Banner 1 — Women's Kurta ── */}
          <div className="hp-mid-banner">
            <div className="hp-banner-text">
              <p className="hp-banner-eyebrow">New Arrivals</p>
              <p className="hp-banner-title">Handcrafted<br />Women's Collection</p>
              <p className="hp-banner-sub">Explore our latest kurti designs</p>
            </div>
            <button
              className="hp-banner-btn"
              onClick={() => navigate("/women/clothing/womens_kurta")}  /* ✅ correct URL */
            >
              Shop Now →
            </button>
          </div>

          {/* ── Women's Kurta ── */}
          <HomeSectionCarousel
            data={categoryProducts?.kurtas || []}
            section="Women's Kurta"
            viewAllLink="/women/clothing/kurtas"  /* ✅ correct URL */
          />

          <div className="hp-section-divider" />

          {/* ── Footwear ── */}
          <HomeSectionCarousel
            data={allFootwear}
            section="Footwear"
            viewAllLink="/all/footwear"   /* ✅ correct URL */
          />

          {/* ── Banner 2 — Accessories ── */}
          <div className="hp-mid-banner">
            <div className="hp-banner-text">
              <p className="hp-banner-eyebrow">New Collection</p>
              <p className="hp-banner-title">Premium<br />Accessories</p>
              <p className="hp-banner-sub">Watches, bags & more</p>
            </div>
            <button
              className="hp-banner-btn"
              onClick={() => navigate("/women/accessories/watches")}  /* ✅ correct URL */
            >
              Shop Now →
            </button>
          </div>

          {/* ── Watches / Accessories ── */}
          <HomeSectionCarousel
            data={categoryProducts?.watches || []}
            section="Accessories"
            viewAllLink="/women/accessories/watches"  /* ✅ correct URL */
          />

          <div className="hp-section-divider" />

          {/* ── Trust bar ── */}
          <div className="hp-trust">
            {[
              { icon: "🚚", label: "Free Shipping",  sub: "On orders above ₹999" },
              { icon: "↩️", label: "Easy Returns",   sub: "30 days hassle-free"  },
              { icon: "🔒", label: "Secure Payment", sub: "100% safe checkout"   },
              { icon: "🎁", label: "Gift Wrapping",  sub: "Available on request" },
            ].map((item) => (
              <div key={item.label} className="hp-trust-item">
                <div className="hp-trust-icon">{item.icon}</div>
                <div>
                  <p className="hp-trust-label">{item.label}</p>
                  <p className="hp-trust-sub">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default HomePage;