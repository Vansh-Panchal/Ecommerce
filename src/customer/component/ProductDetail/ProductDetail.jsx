import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';

import ProductReviewCard from './ProductReviewCard';
import HomeSectionCard1 from '../HomeSectionCard/HomeSectionCard';
import { addItemToCart } from '../../../State/Cart/Action';
import { findProductsById, findProducts } from '../../../State/Product/Action';

export default function ProductDetail() {
    const [selectedSize, setSelectedSize] = useState("");
    const [activeTab, setActiveTab]       = useState("description");

    const navigate      = useNavigate();
    const dispatch      = useDispatch();
    const { productId } = useParams();

    const { product, loading, products } = useSelector((store) => store.products);

    useEffect(() => {
        if (productId) dispatch(findProductsById(productId));
    }, [productId, dispatch]);

    useEffect(() => {
        if (product?.category?.name) {
            dispatch(findProducts({
                category:    product.category.name,
                colors:      [],
                sizes:       [],
                minPrice:    0,
                maxPrice:    100000,
                minDiscount: 0,
                sort:        null,
                pageNumber:  0,
                pageSize:    10,
                stock:       null,
            }));
        }
    }, [product?.category?.name, dispatch]);

    const similarProducts = products?.content?.filter(
        (item) => item.id !== product?.id
    ) || [];

    // ── Size logic ──────────────────────────────────────────────────
    // If the product has no sizes at all (electronics, home, accessories, etc.)
    // we skip size selection entirely — "One Size" is implied.
    const hasSizes       = product?.sizes?.length > 0;
    const canAddToCart   = !hasSizes || !!selectedSize;

    const handleAddtoCart = () => {
        if (!canAddToCart) return;
        dispatch(addItemToCart({
            productId: product?.id,
            size:      hasSizes ? selectedSize : "ONE SIZE",
            quantity:  1,
            price:     product?.discountedPrice,
        }));
        navigate("/cart");
    };

    // ── Rating helpers ──────────────────────────────────────────────
    const ratingsArray = product?.ratings || [];
    const avgRating    = ratingsArray.length > 0
        ? ratingsArray.reduce((sum, r) => sum + r.rating, 0) / ratingsArray.length
        : 0;
    const filledStars  = Math.round(avgRating);

    // ── Guards ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <Box sx={{ width: '100%', py: 20, textAlign: 'center' }}>
                <LinearProgress
                    sx={{
                        maxWidth: '40%', mx: 'auto', mb: 3,
                        height: 3, borderRadius: 2,
                        bgcolor: '#f0ede8',
                        '& .MuiLinearProgress-bar': { bgcolor: '#c9a84c' }
                    }}
                />
                <p style={{ color: '#aaa', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    Loading product...
                </p>
            </Box>
        );
    }

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '5rem', color: '#999' }}>
                Product not found.
            </div>
        );
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

                .pd-root {
                    --cream:      #faf8f5;
                    --warm-white: #fff;
                    --sand:       #f0ede8;
                    --gold:       #c9a84c;
                    --gold-light: #f5e9c8;
                    --ink:        #1a1a2e;
                    --ink-soft:   #4a4a5e;
                    --ink-muted:  #8a8a9a;
                    --border:     rgba(0,0,0,0.07);
                    --shadow-sm:  0 2px 12px rgba(0,0,0,0.06);
                    --shadow-md:  0 8px 32px rgba(0,0,0,0.09);
                    --radius:     16px;
                    font-family: 'Jost', sans-serif;
                    background: var(--cream);
                    min-height: 100vh;
                }

                /* ── Breadcrumb ── */
                .pd-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 20px 40px;
                    font-size: 0.78rem;
                    color: var(--ink-muted);
                    border-bottom: 1px solid var(--border);
                    background: var(--warm-white);
                }
                .pd-breadcrumb span { color: var(--ink-soft); font-weight: 500; }
                .pd-breadcrumb a {
                    color: var(--ink-muted);
                    cursor: pointer;
                    transition: color 0.2s;
                }
                .pd-breadcrumb a:hover { color: var(--gold); }

                /* ── Main grid ── */
                .pd-main {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px;
                }

                /* ── Image panel ── */
                .pd-img-panel {
                    position: sticky;
                    top: 24px;
                    align-self: start;
                }

                /* ✅ FIX: Full image — no cropping */
                .pd-img-main {
                    width: 100%;
                    border-radius: var(--radius);
                    overflow: hidden;
                    background: var(--warm-white);
                    box-shadow: var(--shadow-md);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 340px;
                }
                .pd-img-main img {
                    width: 100%;
                    height: auto;           /* ✅ natural height — no cropping */
                    max-height: 600px;
                    object-fit: contain;    /* ✅ show full image */
                    display: block;
                    transition: transform 0.6s ease;
                }
                .pd-img-main:hover img { transform: scale(1.03); }

                /* Discount ribbon */
                .pd-ribbon {
                    position: absolute;
                    top: 16px;
                    right: 0;
                    background: #e05252;
                    color: #fff;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    padding: 6px 14px 6px 10px;
                    border-radius: 20px 0 0 20px;
                    box-shadow: 0 4px 12px rgba(224,82,82,0.3);
                }

                /* ── Info panel ── */
                .pd-info { display: flex; flex-direction: column; gap: 24px; }

                /* Category tag */
                .pd-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: var(--gold-light);
                    color: #8a6a1a;
                    font-size: 0.7rem;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 5px 12px;
                    border-radius: 20px;
                    width: fit-content;
                }

                .pd-brand {
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: var(--ink-muted);
                    margin-bottom: 6px;
                }
                .pd-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2rem;
                    font-weight: 600;
                    color: var(--ink);
                    line-height: 1.25;
                    margin: 0;
                }

                .pd-divider {
                    height: 1px;
                    background: linear-gradient(90deg, var(--gold), transparent);
                    opacity: 0.4;
                }

                /* Rating row */
                .pd-rating-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .pd-stars       { color: #f5a623; font-size: 1rem; letter-spacing: 2px; }
                .pd-stars-empty { color: #ddd;    font-size: 1rem; letter-spacing: 2px; }
                .pd-avg         { font-size: 0.9rem; font-weight: 700; color: #f5a623; }
                .pd-rating-count { font-size: 0.8rem; color: var(--ink-muted); }
                .pd-review-link {
                    font-size: 0.78rem; color: var(--gold);
                    font-weight: 600; cursor: pointer;
                    text-decoration: underline; text-underline-offset: 3px;
                }

                /* Price block */
                .pd-price-block {
                    background: var(--sand);
                    border-radius: 14px;
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .pd-price-now {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2.2rem;
                    font-weight: 600;
                    color: var(--ink);
                    line-height: 1;
                }
                .pd-price-old  { font-size: 1rem; color: var(--ink-muted); text-decoration: line-through; }
                .pd-price-save {
                    background: #e8f5e9; color: #2e7d32;
                    font-size: 0.75rem; font-weight: 700;
                    padding: 4px 10px; border-radius: 20px;
                }

                /* Color chip */
                .pd-color-row   { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                .pd-color-label {
                    font-size: 0.8rem; font-weight: 600;
                    color: var(--ink-soft); text-transform: uppercase;
                    letter-spacing: 0.08em; margin-right: 4px;
                }
                .pd-color-chip {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: var(--warm-white);
                    border: 1.5px solid var(--border);
                    border-radius: 20px; padding: 4px 12px 4px 8px;
                    font-size: 0.78rem; color: var(--ink-soft); font-weight: 500;
                }
                .pd-color-dot {
                    width: 12px; height: 12px;
                    border-radius: 50%; border: 1px solid rgba(0,0,0,0.1);
                }

                /* Size selector */
                .pd-size-label {
                    font-size: 0.8rem; font-weight: 600;
                    color: var(--ink-soft); text-transform: uppercase;
                    letter-spacing: 0.08em; margin-bottom: 10px;
                }
                .pd-sizes { display: flex; flex-wrap: wrap; gap: 10px; }
                .pd-size-btn {
                    min-width: 52px; height: 52px;
                    padding: 0 12px;
                    border-radius: 12px;
                    border: 1.5px solid var(--border);
                    background: var(--warm-white);
                    font-family: 'Jost', sans-serif;
                    font-size: 0.85rem; font-weight: 600;
                    color: var(--ink-soft); cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: var(--shadow-sm);
                }
                .pd-size-btn:hover {
                    border-color: var(--gold); color: var(--gold);
                    background: var(--gold-light);
                }
                .pd-size-btn.active {
                    border-color: var(--gold); background: var(--gold);
                    color: #fff; box-shadow: 0 4px 16px rgba(201,168,76,0.4);
                }

                /* ✅ No-size badge (for electronics, etc.) */
                .pd-no-size-badge {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 10px 16px; border-radius: 12px;
                    background: #f0fdf4; border: 1px solid #bbf7d0;
                    color: #15803d; font-size: 0.82rem; font-weight: 600;
                }

                .pd-size-warn {
                    font-size: 0.75rem; color: #e05252;
                    margin-top: 8px;
                    display: flex; align-items: center; gap: 4px;
                }

                /* CTA button */
                .pd-cta {
                    width: 100%; padding: 16px;
                    border-radius: 14px; border: none;
                    background: var(--ink); color: #fff;
                    font-family: 'Jost', sans-serif;
                    font-size: 0.9rem; font-weight: 600;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    cursor: pointer; transition: all 0.25s ease;
                    box-shadow: 0 4px 16px rgba(26,26,46,0.2);
                }
                .pd-cta:hover:not(:disabled) {
                    background: var(--gold);
                    box-shadow: 0 6px 20px rgba(201,168,76,0.4);
                    transform: translateY(-1px);
                }
                .pd-cta:disabled {
                    background: #d0cdd8; cursor: not-allowed; box-shadow: none;
                }

                /* Trust badges */
                .pd-trust { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
                .pd-trust-item {
                    background: var(--warm-white);
                    border: 1px solid var(--border);
                    border-radius: 12px; padding: 12px 10px; text-align: center;
                }
                .pd-trust-icon  { font-size: 1.2rem; margin-bottom: 4px; }
                .pd-trust-label { font-size: 0.68rem; color: var(--ink-soft); font-weight: 500; }

                /* ── Tabs ── */
                .pd-tabs-section {
                    max-width: 1200px; margin: 0 auto; padding: 0 40px 40px;
                }
                .pd-tabs {
                    display: flex; gap: 0;
                    border-bottom: 2px solid var(--border); margin-bottom: 28px;
                }
                .pd-tab {
                    padding: 12px 24px;
                    font-family: 'Jost', sans-serif;
                    font-size: 0.85rem; font-weight: 600;
                    letter-spacing: 0.06em; text-transform: uppercase;
                    color: var(--ink-muted); border: none; background: transparent;
                    cursor: pointer; border-bottom: 2px solid transparent;
                    margin-bottom: -2px; transition: all 0.2s ease;
                }
                .pd-tab:hover { color: var(--ink-soft); }
                .pd-tab.active { color: var(--ink); border-bottom-color: var(--gold); }

                .pd-tab-content { animation: fadeIn 0.3s ease; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .pd-description {
                    background: var(--warm-white);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 28px 32px;
                    font-size: 0.95rem; color: var(--ink-soft); line-height: 1.8;
                }
                .pd-no-desc { color: var(--ink-muted); font-style: italic; text-align: center; padding: 32px; }

                .pd-reviews-grid { display: flex; flex-direction: column; gap: 16px; }
                .pd-no-reviews {
                    text-align: center; padding: 48px; color: var(--ink-muted);
                    background: var(--warm-white);
                    border: 1px solid var(--border); border-radius: var(--radius);
                }
                .pd-no-reviews-icon { font-size: 2.5rem; margin-bottom: 12px; }

                /* ── Similar products ── */
                .pd-similar-section {
                    max-width: 1200px; margin: 0 auto; padding: 0 40px 60px;
                }
                .pd-similar-header {
                    display: flex; align-items: baseline; gap: 12px; margin-bottom: 28px;
                }
                .pd-similar-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.8rem; font-weight: 600; color: var(--ink);
                }
                .pd-similar-cat {
                    font-size: 0.8rem; font-weight: 600; color: var(--gold);
                    text-transform: uppercase; letter-spacing: 0.1em;
                    background: var(--gold-light); padding: 3px 10px; border-radius: 20px;
                }
                .pd-similar-grid {
                    display: flex; flex-wrap: wrap; gap: 16px; justify-content: flex-start;
                }

                /* ── Responsive ── */
                @media (max-width: 900px) {
                    .pd-main { grid-template-columns: 1fr; padding: 24px 20px; gap: 32px; }
                    .pd-img-panel { position: static; }
                    .pd-breadcrumb { padding: 14px 20px; }
                    .pd-tabs-section { padding: 0 20px 32px; }
                    .pd-similar-section { padding: 0 20px 40px; }
                    .pd-title { font-size: 1.6rem; }
                }
            `}</style>

            <div className="pd-root">

                {/* ── Breadcrumb ── */}
                <div className="pd-breadcrumb">
                    <a onClick={() => navigate("/")}>Home</a>
                    <span>›</span>
                    <a onClick={() => navigate(-1)}>
                        {product?.category?.name?.replace(/_/g, ' ')}
                    </a>
                    <span>›</span>
                    <span>{product?.brand}</span>
                </div>

                {/* ── Main Grid ── */}
                <div className="pd-main">

                    {/* ── Left: Image ── */}
                    <div className="pd-img-panel">
                        <div className="pd-img-main">
                            {/* ✅ FIX: img with natural height — full image shown, no cropping */}
                            <img
                                src={product?.imageUrl}
                                alt={product?.title}
                            />
                            {product?.discountPercent > 0 && (
                                <div className="pd-ribbon">
                                    {product.discountPercent}% OFF
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Right: Info ── */}
                    <div className="pd-info">

                        {/* Category tag */}
                        <div className="pd-tag">
                            🏷 {product?.category?.name?.replace(/_/g, ' ')}
                        </div>

                        {/* Brand + Title */}
                        <div>
                            <p className="pd-brand">{product?.brand}</p>
                            <h1 className="pd-title">{product?.title}</h1>
                        </div>

                        <div className="pd-divider" />

                        {/* Rating */}
                        <div className="pd-rating-row">
                            <span className="pd-stars">{"★".repeat(filledStars)}</span>
                            <span className="pd-stars-empty">{"★".repeat(5 - filledStars)}</span>
                            {ratingsArray.length > 0 ? (
                                <>
                                    <span className="pd-avg">{avgRating.toFixed(1)}</span>
                                    <span className="pd-rating-count">({ratingsArray.length} ratings)</span>
                                </>
                            ) : (
                                <span className="pd-rating-count">No ratings yet</span>
                            )}
                            {product?.reviews?.length > 0 && (
                                <span className="pd-review-link" onClick={() => setActiveTab("reviews")}>
                                    {product.reviews.length} reviews ↓
                                </span>
                            )}
                        </div>

                        {/* Price block */}
                        <div className="pd-price-block">
                            <span className="pd-price-now">₹{product?.discountedPrice}</span>
                            {product?.price !== product?.discountedPrice && (
                                <span className="pd-price-old">₹{product?.price}</span>
                            )}
                            {product?.discountPercent > 0 && (
                                <span className="pd-price-save">
                                    Save ₹{product.price - product.discountedPrice}
                                </span>
                            )}
                        </div>

                        {/* Color */}
                        {product?.color && (
                            <div className="pd-color-row">
                                <span className="pd-color-label">Color:</span>
                                <div className="pd-color-chip">
                                    <span
                                        className="pd-color-dot"
                                        style={{ backgroundColor: product.color.toLowerCase() }}
                                    />
                                    {product.color}
                                </div>
                            </div>
                        )}

                        {/* ── SIZE SECTION ── */}
                        <div>
                            {hasSizes ? (
                                // ── Products WITH sizes (clothing, footwear, etc.) ──
                                <>
                                    <p className="pd-size-label">
                                        Select Size
                                        {selectedSize && (
                                            <span style={{ color: 'var(--gold)', marginLeft: 8 }}>
                                                — {selectedSize}
                                            </span>
                                        )}
                                    </p>
                                    <div className="pd-sizes">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size.name}
                                                className={`pd-size-btn ${selectedSize === size.name ? 'active' : ''}`}
                                                onClick={() => setSelectedSize(size.name)}
                                            >
                                                {size.name}
                                            </button>
                                        ))}
                                    </div>
                                    {!selectedSize && (
                                        <p className="pd-size-warn">
                                            ⚠ Please select a size to continue
                                        </p>
                                    )}
                                </>
                            ) : (
                                // ── Products WITHOUT sizes (electronics, home, accessories) ──
                                <div className="pd-no-size-badge">
                                    <span>📦</span>
                                    One size — ready to add to cart
                                </div>
                            )}
                        </div>

                        {/* Add to Cart */}
                        <button
                            className="pd-cta"
                            onClick={handleAddtoCart}
                            disabled={!canAddToCart}
                        >
                            {canAddToCart ? "Add to Cart" : "Select a Size First"}
                        </button>

                        {/* Trust badges */}
                        <div className="pd-trust">
                            {[
                                { icon: "🚚", label: "Free Delivery" },
                                { icon: "↩️", label: "Easy Returns"  },
                                { icon: "🔒", label: "Secure Pay"    },
                            ].map(item => (
                                <div key={item.label} className="pd-trust-item">
                                    <div className="pd-trust-icon">{item.icon}</div>
                                    <div className="pd-trust-label">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Tabs: Description / Reviews ── */}
                <div className="pd-tabs-section">
                    <div className="pd-tabs">
                        {["description", "reviews"].map(tab => (
                            <button
                                key={tab}
                                className={`pd-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === "description" ? "Description" : (
                                    `Reviews (${product?.reviews?.length || 0})`
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="pd-tab-content">
                        {activeTab === "description" && (
                            product?.description ? (
                                <div className="pd-description">{product.description}</div>
                            ) : (
                                <div className="pd-description pd-no-desc">
                                    No description available for this product.
                                </div>
                            )
                        )}

                        {activeTab === "reviews" && (
                            product?.reviews?.length > 0 ? (
                                <div className="pd-reviews-grid">
                                    {product.reviews.map((item) => {
                                        const userRating = product?.ratings?.find(
                                            r => r.user.id === item.user.id
                                        )?.rating;
                                        return (
                                            <ProductReviewCard
                                                key={item.id}
                                                reviewData={{ ...item, rating: userRating }}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="pd-no-reviews">
                                    <div className="pd-no-reviews-icon">💬</div>
                                    <p style={{ fontWeight: 600, marginBottom: 6 }}>No reviews yet</p>
                                    <p style={{ fontSize: '0.82rem' }}>Be the first to review this product</p>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* ── Similar Products ── */}
                <div className="pd-similar-section">
                    <div className="pd-similar-header">
                        <h2 className="pd-similar-title">Similar Products</h2>
                        <span className="pd-similar-cat">
                            {product?.category?.name?.replace(/_/g, ' ')}
                        </span>
                    </div>

                    {similarProducts.length > 0 ? (
                        <div className="pd-similar-grid">
                            {similarProducts.slice(0, 5).map((item) => (
                                <HomeSectionCard1 key={item.id} product={item} />
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
                            No similar products found.
                        </p>
                    )}
                </div>

            </div>
        </>
    );
}