import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Helper to calculate average rating from the 'ratings' array in your console
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / ratings.length;
  };

  const averageRating = calculateAverageRating(product.ratings);
  // Using the length of the reviews array for the total count
  const totalReviews = product.reviews?.length || 0;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '15rem',
        margin: '0.75rem',
        borderRadius: '1.25rem',
        background: '#f7f7f8',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.13)'
          : '0 2px 12px rgba(0,0,0,0.07)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Image Section */}
      <div style={{
        height: '18rem',
        overflow: 'hidden',
        borderRadius: '1.25rem 1.25rem 0 0',
        background: '#e8e8ec',
        position: 'relative',
      }}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            transition: 'transform 0.35s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>

      {/* Text Section */}
      <div style={{
        background: '#ffffff',
        padding: '0.85rem 1rem 1rem',
        borderRadius: '0 0 1.25rem 1.25rem',
      }}>
        {/* Brand */}
        <p style={{
          fontSize: '0.65rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#9b9baa',
          marginBottom: '0.25rem',
        }}>
          {product.brand}
        </p>

        {/* Title */}
        <p style={{
          fontSize: '0.88rem',
          fontWeight: '600',
          color: '#1a1a2e',
          lineHeight: '1.35',
          marginBottom: '0.65rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.title}
        </p>

        {/* Price Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#1a1a2e',
          }}>
            ₹{product.discountedPrice}
          </span>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: '400',
            color: '#b0b0be',
            textDecoration: 'line-through',
          }}>
            ₹{product.price}
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            color: '#e05151',
            background: '#fdeaea',
            borderRadius: '0.4rem',
            padding: '0.1rem 0.4rem',
          }}>
            {product.discountPercent}% off
          </span>
        </div>

        {/* Dynamic Star Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          marginTop: '0.6rem',
        }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill={star <= Math.round(averageRating) ? '#f5a623' : 'none'}
              stroke={star <= Math.round(averageRating) ? '#f5a623' : '#d0d0da'}
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
          <span style={{
            fontSize: '0.72rem',
            color: '#9b9baa',
            marginLeft: '0.15rem',
          }}>
            ({totalReviews})
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;