import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeSectionCard({ product }) {
  const navigate = useNavigate();

  // ✅ Calculate real average from ratings array
  const ratingsArray = product?.ratings || [];
  const avgRating = ratingsArray.length > 0
    ? ratingsArray.reduce((sum, r) => sum + r.rating, 0) / ratingsArray.length
    : 0;
  const ratingCount = ratingsArray.length;

  // ✅ Convert average to filled/empty stars
  const filledStars = Math.round(avgRating);
  const emptyStars  = 5 - filledStars;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        .hsc-card {
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          width: 200px;
          margin: 0 8px;
          border-radius: 16px;
          background: #fff;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.28s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .hsc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }

        .hsc-img-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          background: #f7f4ef;
          overflow: hidden;
        }
        .hsc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s ease;
        }
        .hsc-card:hover .hsc-img { transform: scale(1.06); }

        .hsc-badge {
          position: absolute;
          top: 10px; left: 10px;
          background: #1a1a2e;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 4px;
          opacity: 0;
          transform: translateY(-4px);
          transition: all 0.25s ease;
        }
        .hsc-card:hover .hsc-badge { opacity: 1; transform: translateY(0); }

        .hsc-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26,26,46,0);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 14px;
          transition: background 0.3s ease;
        }
        .hsc-card:hover .hsc-overlay { background: rgba(26,26,46,0.18); }
        .hsc-quick {
          background: #1a1a2e;
          color: #fff;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.25s ease;
        }
        .hsc-card:hover .hsc-quick { opacity: 1; transform: translateY(0); }

        .hsc-info {
          padding: 12px 14px 14px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .hsc-brand {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9b8ea0;
        }
        .hsc-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #1a1a2e;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hsc-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
        }
        .hsc-price { font-size: 0.88rem; font-weight: 700; color: #1a1a2e; }
        .hsc-price-old { font-size: 0.76rem; color: #bbb; text-decoration: line-through; }
        .hsc-discount {
          font-size: 0.65rem;
          font-weight: 700;
          color: #e05252;
          background: #fff0f0;
          padding: 2px 5px;
          border-radius: 4px;
        }

        /* ── Rating ── */
        .hsc-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
        }
        .hsc-stars-filled { color: #f5a623; font-size: 0.75rem; letter-spacing: 1px; }
        .hsc-stars-empty  { color: #ddd;    font-size: 0.75rem; letter-spacing: 1px; }
        .hsc-avg {
          font-size: 0.72rem;
          font-weight: 700;
          color: #f5a623;
        }
        .hsc-rating-count { font-size: 0.68rem; color: #aaa; }
        .hsc-no-rating    { font-size: 0.68rem; color: #ccc; font-style: italic; }
      `}</style>

      <div
        className="hsc-card"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Image */}
        <div className="hsc-img-wrap">
          <img
            className="hsc-img"
            src={product.imageUrl}
            alt={product.title || product.brand}
          />
          <span className="hsc-badge">New</span>
          <div className="hsc-overlay">
            <button
              className="hsc-quick"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="hsc-info">
          {product.brand && <p className="hsc-brand">{product.brand}</p>}
          <p className="hsc-title">{product.title}</p>

          {/* Price */}
          <div className="hsc-price-row">
            <span className="hsc-price">
              ₹{product.discountedPrice ?? product.price ?? "—"}
            </span>
            {product.price && product.discountedPrice &&
             product.price !== product.discountedPrice && (
              <>
                <span className="hsc-price-old">₹{product.price}</span>
                <span className="hsc-discount">
                  {Math.round(
                    ((product.price - product.discountedPrice) / product.price) * 100
                  )}% off
                </span>
              </>
            )}
          </div>

          {/* ✅ Rating — dynamic from ratings array */}
          <div className="hsc-rating">
            {ratingCount > 0 ? (
              <>
                {/* Filled stars */}
                <span className="hsc-stars-filled">
                  {"★".repeat(filledStars)}
                </span>
                {/* Empty stars */}
                <span className="hsc-stars-empty">
                  {"★".repeat(emptyStars)}
                </span>
                {/* Average number */}
                <span className="hsc-avg">
                  {avgRating.toFixed(1)}
                </span>
                {/* Count */}
                <span className="hsc-rating-count">
                  ({ratingCount})
                </span>
              </>
            ) : (
              // ✅ Show "No ratings" instead of 0 stars
              <span className="hsc-no-rating">No ratings yet</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSectionCard;