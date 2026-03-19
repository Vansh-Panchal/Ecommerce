import React, { useState, useRef } from 'react';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom'; // ✅ added

function HomeSectionCarousel({ data, section, viewAllLink }) { // ✅ viewAllLink prop
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate(); // ✅ added

  const responsive = {
    0:    { items: 1 },
    480:  { items: 2 },
    720:  { items: 3 },
    1024: { items: 5, itemsFit: 'contain' },
  };

  const items = (data?.content || data || []).map((item, index) => (
    <HomeSectionCard key={item.id || index} product={item} />
  ));

  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const accentMap = {
    "Men's Kurta":   "#c9a84c",
    "Women's Kurta": "#c97a8c",
    default:         "#4c7bc9",
  };
  const accent = accentMap[section] || accentMap.default;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .hsc-section {
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        /* ── Section header ── */
        .hsc-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 4px 20px;
        }
        .hsc-title-group { display: flex; flex-direction: column; gap: 4px; }
        .hsc-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--hsc-accent);
          font-weight: 600;
        }
        .hsc-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1.15;
          margin: 0;
        }
        .hsc-section-title em {
          font-style: italic;
          font-weight: 400;
          color: var(--hsc-accent);
        }

        /* ── View all button ── */
        .hsc-view-all {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--hsc-accent);
          text-decoration: none;
          border-bottom: 1.5px solid var(--hsc-accent);
          padding-bottom: 1px;
          transition: opacity 0.2s;
          cursor: pointer;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
        }
        .hsc-view-all:hover { opacity: 0.65; }

        /* ── Carousel outer — extra horizontal padding so arrows are never clipped ── */
        .hsc-carousel-outer {
          padding: 0 44px;       /* ✅ gives arrows room on both sides */
          position: relative;
        }

        /* ── Nav buttons ── */
        .hsc-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          color: #1a1a2e;
        }
        .hsc-nav-btn:hover {
          background: var(--hsc-accent);
          border-color: var(--hsc-accent);
          color: #fff;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          transform: translateY(-50%) scale(1.08);
        }

        /* ✅ Both arrows now sit inside the padding zone — always visible */
        .hsc-nav-prev { left: 0; }
        .hsc-nav-next { right: 0; }

        /* ── Accent underline ── */
        .hsc-underline {
          width: 48px;
          height: 3px;
          border-radius: 2px;
          background: var(--hsc-accent);
          margin-bottom: 20px;
        }

        /* ── Empty state ── */
        .hsc-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 240px;
          border-radius: 16px;
          background: #f9f7f4;
          border: 2px dashed #e5e0d8;
          color: #aaa;
          font-size: 0.85rem;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .hsc-carousel-outer { padding: 0 36px; }
          .hsc-nav-btn { width: 34px; height: 34px; }
          .hsc-section-title { font-size: 1.4rem; }
        }
      `}</style>

      <div className="hsc-section" style={{ "--hsc-accent": accent }}>

        {/* Header */}
        <div className="hsc-header">
          <div className="hsc-title-group">
            <span className="hsc-eyebrow">Collection</span>
            <h2 className="hsc-section-title">
              {section?.split(" ").slice(0, -1).join(" ")}{" "}
              <em>{section?.split(" ").slice(-1)}</em>
            </h2>
          </div>

          {/* ✅ View All navigates to correct URL */}
          {viewAllLink && (
            <button
              className="hsc-view-all"
              onClick={() => navigate(viewAllLink)}
            >
              View All
            </button>
          )}
        </div>

        <div className="hsc-underline" />

        {/* ✅ Carousel wrapped in outer div with padding for arrows */}
        <div className="hsc-carousel-outer">
          {items.length > 0 ? (
            <>
              <AliceCarousel
                ref={carouselRef}
                items={items}
                responsive={responsive}
                disableButtonsControls
                disableDotsControls
                infinite
                buttonsDisabled
                onSlideChanged={(e) => setActiveIndex(e.item)}
              />

              {/* Prev */}
              <button className="hsc-nav-btn hsc-nav-prev" onClick={slidePrev} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Next */}
              <button className="hsc-nav-btn hsc-nav-next" onClick={slideNext} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          ) : (
            <div className="hsc-empty">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              No products found
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default HomeSectionCarousel;