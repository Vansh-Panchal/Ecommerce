import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../State/Order/Action";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ Values now match exact backend status strings
const orderStatus = [
  { label: "Placed",           value: "PLACED"           },
  { label: "Confirmed",        value: "CONFIRMED"        },
  { label: "Shipped",          value: "SHIPPED"          },
  { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered",        value: "DELIVERED"        },
  { label: "Cancelled",        value: "CANCELLED"        },
  { label: "Returned",         value: "RETURNED"         },
];

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = useSelector((store) => store);

  const getActiveFilters = () => {
    const params = new URLSearchParams(location.search);
    const raw = params.get("order_status");
    return raw ? raw.split(",").filter(Boolean) : [];
  };

  const handleFilter = (value) => {
    const active = getActiveFilters();
    const updated = active.includes(value)
      ? active.filter((v) => v !== value)
      : [...active, value];

    const params = new URLSearchParams();
    if (updated.length > 0) params.set("order_status", updated.join(","));
    navigate({ search: updated.length > 0 ? `?${params.toString()}` : "" });
  };

  // ✅ Always fetch ALL orders — filter client-side
  // This works regardless of whether the backend supports status filtering
  useEffect(() => {
    dispatch(getOrderHistory({ status: "" }));
  }, [dispatch]);

  const activeFilters = getActiveFilters();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap');

        .ord-root {
          font-family: 'Jost', sans-serif;
          background: #faf8f5;
          min-height: 100vh;
          padding: 32px 40px 60px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 24px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Filter panel ── */
        .ord-filter {
          background: #fff;
          border-radius: 14px;
          padding: 22px 20px;
          position: sticky;
          top: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .ord-filter-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a8a9a;
          margin-bottom: 16px;
        }
        .ord-filter-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .ord-filter-item:hover { background: #fafafa; }

        /* Custom checkbox */
        .ord-checkbox {
          width: 16px; height: 16px;
          border: 1.5px solid #d1d5db;
          border-radius: 4px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          background: #fff;
        }
        .ord-checkbox.checked {
          background: #1a1a2e;
          border-color: #1a1a2e;
        }
        .ord-checkbox.checked::after {
          content: '';
          width: 5px; height: 9px;
          border: 2px solid #fff;
          border-top: none; border-left: none;
          transform: rotate(45deg) translateY(-1px);
          display: block;
        }
        .ord-filter-label {
          font-size: 0.83rem;
          color: #374151;
          font-weight: 500;
        }
        .ord-filter-label.active { color: #1a1a2e; font-weight: 700; }

        /* Active filter count badge */
        .ord-filter-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px; height: 18px;
          background: #1a1a2e;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          border-radius: 50%;
          margin-left: auto;
        }

        /* Clear filters */
        .ord-clear-btn {
          width: 100%;
          margin-top: 14px;
          padding: 7px;
          border-radius: 7px;
          border: 1px solid #e0e0e8;
          background: transparent;
          color: #6b7280;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .ord-clear-btn:hover { background: #f3f4f6; color: #374151; }

        /* ── Order list ── */
        .ord-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ord-empty {
          background: #fff;
          border-radius: 14px;
          padding: 60px 24px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .ord-empty-icon { font-size: 2.5rem; margin-bottom: 12px; opacity: 0.4; }
        .ord-empty-text {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        @media (max-width: 800px) {
          .ord-root {
            grid-template-columns: 1fr;
            padding: 20px 16px 48px;
          }
          .ord-filter { position: static; }
        }
      `}</style>

      <div className="ord-root">

        {/* ── Filter Panel ── */}
        <div className="ord-filter">
          <p className="ord-filter-title">
            Order Status
            {activeFilters.length > 0 && (
              <span className="ord-filter-badge">{activeFilters.length}</span>
            )}
          </p>

          {orderStatus.map((opt) => {
            const isChecked = activeFilters.includes(opt.value);
            return (
              <div
                key={opt.value}
                className="ord-filter-item"
                onClick={() => handleFilter(opt.value)}
              >
                <div className={`ord-checkbox ${isChecked ? 'checked' : ''}`} />
                <span className={`ord-filter-label ${isChecked ? 'active' : ''}`}>
                  {opt.label}
                </span>
              </div>
            );
          })}

          {activeFilters.length > 0 && (
            <button
              className="ord-clear-btn"
              onClick={() => navigate({ search: "" })}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* ── Order List ── */}
        <div className="ord-list">
          {(() => {
            // ✅ Filter client-side from full orders list
            const allOrders = order.orders || [];
            const filtered  = activeFilters.length > 0
              ? allOrders.filter((o) => activeFilters.includes(o.orderStatus))
              : allOrders;

            return filtered.length > 0 ? (
              filtered.map((item) => <OrderCard key={item.id} order={item} />)
            ) : (
              <div className="ord-empty">
                <div className="ord-empty-icon">📦</div>
                <p className="ord-empty-text">
                  {activeFilters.length > 0
                    ? "No orders match the selected filters."
                    : "You have no orders yet."}
                </p>
              </div>
            );
          })()}
        </div>

      </div>
    </>
  );
}

export default Order;