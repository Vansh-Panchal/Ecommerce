import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import { createReview } from '../../../State/Review/Action';
import { createRating } from '../../../State/Rating/Action';

const ReviewProduct = () => {
    const { productId } = useParams();
    const dispatch      = useDispatch();
    const navigate      = useNavigate();
    const location      = useLocation();
    const { products }  = useSelector((store) => store);

    // ✅ Read the actual order-item price passed from OrderDetail
    const itemPrice = location.state?.itemPrice ?? null;

    const [ratingValue, setRatingValue] = useState(0);
    const [reviewText, setReviewText]   = useState("");
    const [submitted, setSubmitted]     = useState(false);

    useEffect(() => {
        dispatch(findProductsById(productId));
    }, [productId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createReview({ productId, review: reviewText }));
        await dispatch(createRating({ productId, rating: ratingValue }));
        dispatch(findProductsById(productId));
        setSubmitted(true);
        setTimeout(() => navigate(-1), 1800);
    };

    const product = products.product;

    const ratingLabels = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent",
    };

    // ✅ Display order item price if available, else fall back to product price
    const displayPrice = itemPrice ?? product?.discountedPrice;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');

                .rp-root {
                    font-family: 'Jost', sans-serif;
                    background: #faf8f5;
                    min-height: 100vh;
                    padding: 40px 24px 60px;
                }

                .rp-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2rem;
                    font-weight: 600;
                    color: #1a1a2e;
                    text-align: center;
                    margin-bottom: 36px;
                }

                .rp-layout {
                    display: grid;
                    grid-template-columns: 340px 1fr;
                    gap: 28px;
                    max-width: 960px;
                    margin: 0 auto;
                    align-items: start;
                }

                /* ── Product card ── */
                .rp-product-card {
                    background: #fff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
                    position: sticky;
                    top: 24px;
                }

                .rp-product-img {
                    width: 100%;
                    background: #f0ede8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    min-height: 260px;
                }
                .rp-product-img img {
                    width: 100%;
                    height: auto;
                    max-height: 320px;
                    object-fit: contain;
                    display: block;
                }

                .rp-product-info {
                    padding: 18px 20px;
                    text-align: center;
                    box-shadow: inset 0 1px 0 rgba(0,0,0,0.06);
                }
                .rp-product-title {
                    font-size: 0.88rem;
                    font-weight: 600;
                    color: #1a1a2e;
                    line-height: 1.4;
                    margin-bottom: 6px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .rp-product-brand {
                    font-size: 0.76rem;
                    color: #9ca3af;
                    font-style: italic;
                    font-weight: 500;
                }
                .rp-product-price {
                    display: inline-block;
                    margin-top: 8px;
                    font-size: 0.92rem;
                    font-weight: 700;
                    color: #1a1a2e;
                    background: #f0ede8;
                    padding: 3px 12px;
                    border-radius: 20px;
                }

                /* ── Price source badge ── */
                .rp-price-source {
                    display: block;
                    font-size: 0.62rem;
                    color: #9ca3af;
                    margin-top: 4px;
                    letter-spacing: 0.04em;
                }

                /* ── Form panel ── */
                .rp-form-panel {
                    background: #fff;
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
                }

                .rp-section-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #8a8a9a;
                    margin-bottom: 12px;
                }

                .rp-stars-wrap {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                }
                .rp-rating-label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #c9a84c;
                    min-width: 80px;
                    transition: all 0.2s;
                }

                .rp-star-hint {
                    display: flex;
                    gap: 6px;
                    margin-top: 8px;
                    margin-bottom: 24px;
                }
                .rp-star-dot {
                    width: 28px;
                    height: 4px;
                    border-radius: 2px;
                    background: #e5e7eb;
                    transition: background 0.2s;
                }
                .rp-star-dot.filled { background: #c9a84c; }

                .rp-textarea-wrap { margin-bottom: 28px; }
                .rp-textarea {
                    width: 100%;
                    padding: 14px 16px;
                    border: 1.5px solid #e0e0e8;
                    border-radius: 10px;
                    font-family: 'Jost', sans-serif;
                    font-size: 0.88rem;
                    color: #1a1a2e;
                    resize: vertical;
                    min-height: 140px;
                    outline: none;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    box-sizing: border-box;
                    background: #fff;
                }
                .rp-textarea::placeholder { color: #c0c0cc; }
                .rp-textarea:focus {
                    border-color: #c9a84c;
                    box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
                }
                .rp-char-count {
                    font-size: 0.68rem;
                    color: #b0b0be;
                    text-align: right;
                    margin-top: 4px;
                }

                .rp-btn-row {
                    display: flex;
                    gap: 12px;
                }
                .rp-submit-btn {
                    flex: 1;
                    padding: 13px;
                    border-radius: 10px;
                    border: none;
                    background: #1a1a2e;
                    color: #fff;
                    font-family: 'Jost', sans-serif;
                    font-size: 0.88rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .rp-submit-btn:hover:not(:disabled) {
                    background: #c9a84c;
                    box-shadow: 0 4px 14px rgba(201,168,76,0.3);
                    transform: translateY(-1px);
                }
                .rp-submit-btn:disabled {
                    background: #d0cdd8;
                    cursor: not-allowed;
                    transform: none;
                }
                .rp-cancel-btn {
                    padding: 13px 20px;
                    border-radius: 10px;
                    border: 1.5px solid #e0e0e8;
                    background: transparent;
                    color: #6b7280;
                    font-family: 'Jost', sans-serif;
                    font-size: 0.88rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.18s;
                }
                .rp-cancel-btn:hover {
                    border-color: #9ca3af;
                    color: #374151;
                    background: #f9fafb;
                }

                .rp-success {
                    text-align: center;
                    padding: 48px 24px;
                }
                .rp-success-icon { font-size: 3rem; margin-bottom: 16px; }
                .rp-success-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.6rem;
                    font-weight: 600;
                    color: #1a1a2e;
                    margin-bottom: 8px;
                }
                .rp-success-sub { font-size: 0.83rem; color: #9ca3af; }

                .rp-divider {
                    height: 1px;
                    background: #f0ede8;
                    margin: 24px 0;
                }

                @media (max-width: 768px) {
                    .rp-layout { grid-template-columns: 1fr; }
                    .rp-product-card { position: static; }
                    .rp-form-panel { padding: 24px 20px; }
                }
            `}</style>

            <div className="rp-root">
                <h1 className="rp-title">Rate & Review This Product</h1>

                <div className="rp-layout">

                    {/* ── LEFT: Product Card ── */}
                    <div className="rp-product-card">
                        <div className="rp-product-img">
                            <img src={product?.imageUrl} alt={product?.title} />
                        </div>
                        <div className="rp-product-info">
                            <p className="rp-product-title">{product?.title}</p>
                            <p className="rp-product-brand">{product?.brand}</p>

                            {/* ✅ Show the price that was actually paid in the order */}
                            {displayPrice && (
                                <>
                                    <span className="rp-product-price">
                                        ₹{displayPrice?.toLocaleString()}
                                    </span>
                                    {itemPrice && (
                                        <span className="rp-price-source">Price paid in your order</span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: Form ── */}
                    <div className="rp-form-panel">
                        {submitted ? (
                            <div className="rp-success">
                                <div className="rp-success-icon">🎉</div>
                                <p className="rp-success-title">Thank you for your review!</p>
                                <p className="rp-success-sub">Redirecting you back...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>

                                <p className="rp-section-label">Your Rating</p>
                                <div className="rp-stars-wrap">
                                    <Rating
                                        name="product-rating"
                                        value={ratingValue}
                                        onChange={(e, val) => setRatingValue(val)}
                                        size="large"
                                        sx={{
                                            fontSize: "2.6rem",
                                            "& .MuiRating-iconFilled":  { color: "#c9a84c" },
                                            "& .MuiRating-iconHover":   { color: "#e8c96a" },
                                            "& .MuiRating-iconEmpty":   { color: "#e5e7eb" },
                                        }}
                                    />
                                    {ratingValue > 0 && (
                                        <span className="rp-rating-label">
                                            {ratingLabels[ratingValue]}
                                        </span>
                                    )}
                                </div>

                                <div className="rp-star-hint">
                                    {[1,2,3,4,5].map((n) => (
                                        <div
                                            key={n}
                                            className={`rp-star-dot ${n <= ratingValue ? 'filled' : ''}`}
                                        />
                                    ))}
                                </div>

                                <div className="rp-divider" />

                                <p className="rp-section-label">Your Review</p>
                                <div className="rp-textarea-wrap">
                                    <textarea
                                        className="rp-textarea"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Tell us about the quality, fit, or style — what did you love or what could be better?"
                                        maxLength={500}
                                    />
                                    <p className="rp-char-count">{reviewText.length}/500</p>
                                </div>

                                <div className="rp-btn-row">
                                    <button
                                        type="button"
                                        className="rp-cancel-btn"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rp-submit-btn"
                                        disabled={!ratingValue || !reviewText.trim()}
                                    >
                                        Submit Review
                                    </button>
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewProduct;