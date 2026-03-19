import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { navigation2 } from "./navigation2";
import { deepPurple } from "@mui/material/colors";
import AuthModal from "../../Auth/AuthModal";
import { getUser, logout } from "../../../State/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import ProductSearch from "../Product/ProductSearch";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MegaDropdown({ category, onNavigate, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#fff",
        borderTop: "1px solid #e5e7eb",
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        animation: "megaFadeIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "20px 32px 24px",
          display: "flex",
          gap: 0,
        }}
      >
        {/* ── Category columns ── */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "20px 32px",
            maxHeight: 400,
            overflowY: "auto",
            paddingRight: 24,
            borderRight: "1px solid #f3f4f6",
          }}
        >
          {category.sections.map((section) => (
            <div key={section.id}>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#111827",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                  paddingBottom: 5,
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                {section.name}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.items.map((item) => (
                  <li key={item.id}>
                    <span
                      onClick={() => {
                        onNavigate(`/${category.id}/${section.id}/${item.id}`);
                        onClose();
                      }}
                      style={{
                        display: "block",
                        padding: "3px 0",
                        fontSize: "0.82rem",
                        color: "#4b5563",
                        cursor: "pointer",
                        transition: "color 0.13s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#4f46e5")}
                      onMouseLeave={(e) => (e.target.style.color = "#4b5563")}
                    >
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Featured images strip ── */}
        <div
          style={{
            width: 200,
            flexShrink: 0,
            paddingLeft: 24,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <p
            style={{
              fontSize: "0.67rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#9ca3af",
              marginBottom: 4,
            }}
          >
            Featured
          </p>
          {category.featured.map((feat) => (
            <div
              key={feat.name}
              onClick={() => { onNavigate(feat.href); onClose(); }}
              style={{
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                flex: 1,
                minHeight: 90,
                maxHeight: 115,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={feat.imageSrc}
                alt={feat.imageAlt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.28s ease",
                }}
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/200x100/e0e7ff/4f46e5?text=${encodeURIComponent(feat.name)}`;
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.62), transparent)",
                  padding: "8px 10px 7px",
                }}
              >
                <span style={{ fontSize: "0.73rem", fontWeight: 700, color: "#fff", display: "block" }}>
                  {feat.name}
                </span>
                <span style={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.82)" }}>
                  Shop now →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);

  const handleUserClick = (e) => setAnchorEl(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);
  const handleOpen = () => setOpenAuthModal(true);
  const handleClose = () => setOpenAuthModal(false);
  const handleLogout = () => { handleCloseUserMenu(); dispatch(logout()); };

  useEffect(() => { if (jwt) dispatch(getUser()); }, [jwt]);

  useEffect(() => {
    if (auth.user) handleClose();
    if (location.pathname === "/login" || location.pathname === "/register") navigate(-1);
  }, [auth.user]);

  useEffect(() => {
    const handler = (e) => {
      const clickedInsideNav = navRef.current && navRef.current.contains(e.target);
      const clickedInsideDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
      if (!clickedInsideNav && !clickedInsideDropdown) {
        setActiveCat(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setActiveCat(null); }, [location.pathname]);

  useEffect(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setDropdownTop(rect.bottom);
    }
  });

  const activeCatData = navigation2.categories.find((c) => c.id === activeCat);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&display=swap');

        .nav-promo {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
          padding: 7px 16px;
          letter-spacing: 0.02em;
        }
        .nav-cat-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          transition: color 0.13s, background 0.13s;
          white-space: nowrap;
          outline: none;
        }
        .nav-cat-btn:hover, .nav-cat-btn.active {
          color: #4f46e5;
          background: #f5f3ff;
        }
        .nav-cat-btn svg {
          width: 14px; height: 14px;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .nav-cat-btn.active svg { transform: rotate(180deg); }

        /* ── Shopyverse brand ── */
        .sv-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .sv-logo-mark {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(79,70,229,0.38);
          flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sv-brand:hover .sv-logo-mark {
          transform: rotate(-4deg) scale(1.07);
          box-shadow: 0 6px 20px rgba(79,70,229,0.45);
        }
        .sv-logo-mark svg {
          width: 20px; height: 20px;
        }

        .sv-wordmark {
          font-family: 'Sora', sans-serif;
          font-size: 1.28rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          user-select: none;
          display: flex;
          align-items: baseline;
          gap: 0;
        }
        .sv-word-shopy {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sv-word-verse {
          background: linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sv-tagline {
          font-size: 0.47rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a5b4fc;
          margin-top: 2px;
          line-height: 1;
        }

        /* hide tagline on xs */
        @media (max-width: 400px) {
          .sv-tagline { display: none; }
          .sv-wordmark { font-size: 1.1rem; }
        }

        .mob-section-title {
          font-size: 0.67rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #6b7280; margin: 14px 0 6px;
        }
        .mob-item {
          font-size: 0.87rem; color: #374151;
          padding: 6px 0; cursor: pointer;
          border-bottom: 1px solid #f3f4f6;
          transition: color 0.13s;
        }
        .mob-item:hover { color: #4f46e5; }
      `}</style>

      {/* Sticky nav wrapper */}
      <div className="bg-white sticky top-0 z-50 shadow-sm" ref={navRef}>

        {/* ══════ MOBILE DRAWER ══════ */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[200] lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0" enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100" leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <div className="fixed inset-0 z-[200] flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full" enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0" leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-2xl">
                  <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-gray-100">
                    {/* Mobile drawer brand */}
                    <Link to="/" onClick={() => setOpen(false)} className="sv-brand">
                      <div className="sv-logo-mark">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                          <line x1="3" y1="6" x2="21" y2="6"/>
                          <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                      </div>
                      <div>
                        <div className="sv-wordmark">
                          <span className="sv-word-shopy">Shopy</span>
                          <span className="sv-word-verse">verse</span>
                        </div>
                      </div>
                    </Link>
                    <button onClick={() => setOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-md">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200 overflow-x-auto">
                      <Tab.List className="-mb-px flex px-2">
                        {navigation2.categories.map((cat) => (
                          <Tab
                            key={cat.name}
                            className={({ selected }) => classNames(
                              selected ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-600",
                              "flex-shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-xs font-semibold"
                            )}
                          >
                            {cat.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>

                    <Tab.Panels as={Fragment}>
                      {navigation2.categories.map((cat) => (
                        <Tab.Panel key={cat.name} className="px-4 pt-5 pb-8 space-y-5">
                          <div className="grid grid-cols-2 gap-3">
                            {cat.featured.map((item) => (
                              <div
                                key={item.name}
                                onClick={() => { navigate(item.href); setOpen(false); }}
                                className="relative rounded-xl overflow-hidden cursor-pointer h-24"
                              >
                                <img
                                  src={item.imageSrc} alt={item.imageAlt}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = `https://placehold.co/200x100/e0e7ff/4f46e5?text=${encodeURIComponent(item.name)}`;
                                  }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2">
                                  <span className="text-white text-xs font-bold block">{item.name}</span>
                                  <span className="text-white/70 text-xs">Shop now</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          {cat.sections.map((section) => (
                            <div key={section.name}>
                              <p className="mob-section-title">{section.name}</p>
                              <div>
                                {section.items.map((item) => (
                                  <p
                                    key={item.name} className="mob-item"
                                    onClick={() => { navigate(`/${cat.id}/${section.id}/${item.id}`); setOpen(false); }}
                                  >
                                    {item.name}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* ══════ PROMO BANNER ══════ */}
        <div className="nav-promo">
          🚚 Free delivery on orders over ₹999 &nbsp;|&nbsp; ✨ Authentic products &nbsp;|&nbsp; ↩️ Easy 30-day returns
        </div>

        {/* ══════ MAIN NAVBAR ══════ */}
        <nav className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center gap-4">

              {/* Hamburger — mobile */}
              <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-md" onClick={() => setOpen(true)}>
                <Bars3Icon className="h-6 w-6" />
              </button>

              {/* ── Shopyverse Brand Logo ── */}
              <Link to="/" className="sv-brand" onClick={() => setActiveCat(null)}>
                {/* Icon mark */}
                <div className="sv-logo-mark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>

                {/* Wordmark + tagline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div className="sv-wordmark">
                    <span className="sv-word-shopy">Shopy</span>
                    <span className="sv-word-verse">verse</span>
                  </div>
                  <span className="sv-tagline">Shop the universe</span>
                </div>
              </Link>

              {/* ── Desktop category buttons ── */}
              <div className="hidden lg:flex lg:items-center lg:gap-0.5 lg:ml-4">
                {navigation2.categories.map((category) => (
                  <button
                    key={category.id}
                    className={classNames("nav-cat-btn", activeCat === category.id ? "active" : "")}
                    onClick={() =>
                      setActiveCat(activeCat === category.id ? null : category.id)
                    }
                  >
                    {category.name}
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* ── Right side ── */}
              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:block">
                  <ProductSearch />
                </div>

                {auth.user?.firstName ? (
                  <>
                    <Avatar
                      onClick={handleUserClick}
                      sx={{
                        bgcolor: deepPurple[500],
                        cursor: "pointer",
                        width: { xs: 32, lg: 38 },
                        height: { xs: 32, lg: 38 },
                        fontSize: { xs: "0.8rem", lg: "1rem" },
                      }}
                    >
                      {auth.user.firstName[0].toUpperCase()}
                    </Avatar>
                    <Menu
                      anchorEl={anchorEl}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      PaperProps={{ sx: { mt: 1, minWidth: 160, boxShadow: 3, borderRadius: 2 } }}
                    >
                      <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/account/profile"); }}>Profile</MenuItem>
                      <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/account/order"); }}>My Orders</MenuItem>
                      <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    disableElevation
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      bgcolor: "#4f46e5",
                      color: "#fff",
                      fontSize: { xs: "0.72rem", sm: "0.82rem" },
                      px: { xs: "10px", sm: "16px" },
                      py: "6px",
                      borderRadius: "8px",
                      minWidth: "auto",
                      "&:hover": { bgcolor: "#4338ca" },
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>

            </div>
          </div>
        </nav>
      </div>

      {/* ══════ FULL-WIDTH DROPDOWN ══════ */}
      {activeCat && activeCatData && (
        <div
          ref={dropdownRef}
          style={{ position: "fixed", top: dropdownTop, left: 0, right: 0, zIndex: 9998 }}
        >
          <MegaDropdown
            category={activeCatData}
            onNavigate={(path) => navigate(path)}
            onClose={() => setActiveCat(null)}
          />
        </div>
      )}

      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </>
  );
}