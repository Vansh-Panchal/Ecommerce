import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';

function CartItem({ item }) {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(item.quantity);

    // ── Stock info from product ──────────────────────────────────
    const totalStock = item.product?.quantity || 0;
    const isOutOfStock = totalStock === 0;
    const isLowStock   = totalStock > 0 && totalStock <= 5;
    const atMaxQty     = qty >= totalStock;

    const handleUpdateCartItem = (num) => {
        const newQty = qty + num;
        if (newQty < 1) return;
        if (newQty > totalStock) return; // ✅ cap at total stock
        setQty(newQty);
        dispatch(updateCartItem({
            cartItemId: item.id,
            data: { quantity: newQty }
        }));
    };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item.id));
    };

    useEffect(() => {
        setQty(item.quantity);
    }, [item.quantity]);

    return (
        <>
            <style>{`
                .ci-root {
                    background: #fff;
                    border: 1px solid rgba(0,0,0,0.07);
                    border-radius: 16px;
                    padding: 20px;
                    display: flex;
                    gap: 18px;
                    align-items: flex-start;
                    transition: box-shadow 0.2s;
                }
                .ci-root:hover {
                    box-shadow: 0 6px 24px rgba(0,0,0,0.07);
                }

                /* Image */
                .ci-img {
                    width: 96px;
                    height: 110px;
                    flex-shrink: 0;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #f0ede8;
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .ci-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                    display: block;
                }

                /* Info */
                .ci-info {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .ci-title {
                    font-size: 0.92rem;
                    font-weight: 600;
                    color: #1a1a2e;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ci-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    align-items: center;
                }
                .ci-meta-chip {
                    font-size: 0.72rem;
                    color: #6b7280;
                    background: #f3f4f6;
                    padding: 2px 8px;
                    border-radius: 20px;
                    font-weight: 500;
                }

                /* Stock badge */
                .ci-stock-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 2px 8px;
                    border-radius: 20px;
                    letter-spacing: 0.04em;
                }
                .ci-stock-badge.in-stock {
                    background: #e8f5e9;
                    color: #2e7d32;
                }
                .ci-stock-badge.low-stock {
                    background: #fff8e1;
                    color: #e65100;
                }
                .ci-stock-badge.out-of-stock {
                    background: #fff0f0;
                    color: #e05252;
                }

                /* Qty max warning */
                .ci-max-warn {
                    font-size: 0.71rem;
                    color: #e65100;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 3px;
                }

                /* Controls row */
                .ci-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 6px;
                }

                /* Qty stepper */
                .ci-stepper {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 10px;
                    overflow: hidden;
                    background: #fafafa;
                }
                .ci-stepper-btn {
                    width: 34px;
                    height: 34px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #4b5563;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.15s, color 0.15s;
                    flex-shrink: 0;
                }
                .ci-stepper-btn:hover:not(:disabled) {
                    background: #f0ede8;
                    color: #1a1a2e;
                }
                .ci-stepper-btn:disabled {
                    color: #d1d5db;
                    cursor: not-allowed;
                }
                .ci-stepper-btn.add:hover:not(:disabled) {
                    background: #f5e9c8;
                    color: #c9a84c;
                }
                .ci-stepper-val {
                    min-width: 36px;
                    text-align: center;
                    font-size: 0.88rem;
                    font-weight: 700;
                    color: #1a1a2e;
                    border-left: 1.5px solid #e5e7eb;
                    border-right: 1.5px solid #e5e7eb;
                    padding: 6px 4px;
                }

                /* Remove button */
                .ci-remove-btn {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #e05252;
                    background: #fff0f0;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    padding: 6px 14px;
                    cursor: pointer;
                    transition: background 0.15s;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }
                .ci-remove-btn:hover { background: #fee2e2; }

                /* Price row */
                .ci-price-row {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    margin-top: 4px;
                    flex-wrap: wrap;
                }
                .ci-price-now {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: #1a1a2e;
                }
                .ci-price-old {
                    font-size: 0.85rem;
                    color: #9ca3af;
                    text-decoration: line-through;
                }
                .ci-price-off {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #2e7d32;
                    background: #e8f5e9;
                    padding: 2px 8px;
                    border-radius: 20px;
                }

                @media (max-width: 500px) {
                    .ci-img { width: 76px; height: 88px; }
                    .ci-title { font-size: 0.82rem; }
                }
            `}</style>

            <div className="ci-root">

                {/* ── Image ── */}
                <div className="ci-img">
                    <img src={item.product?.imageUrl} alt={item.product?.title} />
                </div>

                {/* ── Info ── */}
                <div className="ci-info">

                    <p className="ci-title">{item.product?.title}</p>

                    {/* Meta chips + stock badge */}
                    <div className="ci-meta">
                        {item.size && item.size !== "ONE SIZE" && (
                            <span className="ci-meta-chip">Size: {item.size}</span>
                        )}
                        <span className="ci-meta-chip">Seller: {item.product?.brand}</span>

                        {/* ✅ Stock badge */}
                        {isOutOfStock ? (
                            <span className="ci-stock-badge out-of-stock">✕ Out of Stock</span>
                        ) : isLowStock ? (
                            <span className="ci-stock-badge low-stock">⚡ Only {totalStock} left</span>
                        ) : (
                            <span className="ci-stock-badge in-stock">✓ In Stock</span>
                        )}
                    </div>

                    {/* ✅ Max qty warning */}
                    {atMaxQty && !isOutOfStock && (
                        <p className="ci-max-warn">
                            ⚠ Max available quantity reached ({totalStock})
                        </p>
                    )}

                    {/* Controls */}
                    <div className="ci-controls">

                        {/* Qty stepper */}
                        <div className="ci-stepper">
                            <button
                                className="ci-stepper-btn"
                                onClick={() => handleUpdateCartItem(-1)}
                                disabled={qty <= 1}
                                title="Decrease quantity"
                            >
                                −
                            </button>
                            <span className="ci-stepper-val">{qty}</span>
                            <button
                                className="ci-stepper-btn add"
                                onClick={() => handleUpdateCartItem(1)}
                                disabled={atMaxQty || isOutOfStock}   // ✅ blocked at max
                                title={atMaxQty ? `Max ${totalStock} available` : "Increase quantity"}
                            >
                                +
                            </button>
                        </div>

                        {/* Remove */}
                        <button className="ci-remove-btn" onClick={handleRemoveCartItem}>
                            Remove
                        </button>
                    </div>

                    {/* Price */}
                    <div className="ci-price-row">
                        <span className="ci-price-now">
                            ₹{(item.product?.discountedPrice * qty).toLocaleString()}
                        </span>
                        {item.product?.price !== item.product?.discountedPrice && (
                            <span className="ci-price-old">
                                ₹{(item.product?.price * qty).toLocaleString()}
                            </span>
                        )}
                        {item.product?.discountPercent > 0 && (
                            <span className="ci-price-off">
                                {item.product.discountPercent}% off
                            </span>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default CartItem;