import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getCustomers } from "../../State/Admin/Customers/Action";

const CustomerDetails = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const { customers, loading } = useSelector((store) => store.customer);

  useEffect(() => {
    if (customers.length === 0) dispatch(getCustomers());
  }, [dispatch, customers.length]);

  const customer = customers.find((c) => c.id === Number(id));
  const initials = [customer?.firstName?.[0], customer?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "U";
  const joinDate = customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const infoItems = [
    { emoji: "✉️", label: "Email",        value: customer?.email || "—",             bg: "#eef2ff" },
    { emoji: "📱", label: "Mobile",       value: customer?.mobile || "Not Provided", bg: "#f0fdf4" },
    { emoji: "🪪", label: "Customer ID",  value: `#${customer?.id}`,                 bg: "#fdf4ff" },
    { emoji: "📅", label: "Member Since", value: joinDate,                            bg: "#fff8e6" },
  ];

  if (loading) return (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}><CircularProgress sx={{ color: "#6366f1" }} /></Box>);
  if (!customer) return (<Box sx={{ p: 5, textAlign: "center" }}><Typography sx={{ fontSize: "1rem", color: "#94a3b8" }}>Customer not found.</Typography></Box>);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        .cdd-root { font-family:'DM Sans',sans-serif; background:#f8f9fe; min-height:100vh; padding:32px; }
        .cdd-back { display:inline-flex; align-items:center; gap:6px; padding:8px 18px; border-radius:10px; border:none; background:#fff; color:#64748b; font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:600; cursor:pointer; margin-bottom:28px; box-shadow:0 1px 4px rgba(0,0,0,0.07); transition:all 0.15s; }
        .cdd-back:hover { background:#f1f5f9; color:#1e293b; transform:translateX(-2px); }
        .cdd-grid { display:grid; grid-template-columns:290px 1fr; gap:22px; align-items:start; max-width:1080px; }
        .cdd-profile { background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 4px 24px rgba(99,102,241,0.09); border:1px solid #eef0f8; animation:cddUp 0.35s ease both; }
        @keyframes cddUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .cdd-banner { height:88px; background:linear-gradient(135deg,#6366f1 0%,#818cf8 60%,#a5b4fc 100%); position:relative; overflow:hidden; }
        .cdd-banner::before { content:''; position:absolute; width:130px; height:130px; border-radius:50%; background:rgba(255,255,255,0.08); top:-55px; right:-30px; }
        .cdd-banner::after  { content:''; position:absolute; width:70px;  height:70px;  border-radius:50%; background:rgba(255,255,255,0.06); bottom:-25px; left:18px; }
        .cdd-avatar-area { display:flex; flex-direction:column; align-items:center; margin-top:-42px; padding:0 20px 24px; }
        .cdd-avatar-ring { width:84px; height:84px; border-radius:50%; background:linear-gradient(135deg,#6366f1,#818cf8); padding:3px; box-shadow:0 0 0 4px #fff,0 6px 20px rgba(99,102,241,0.28); }
        .cdd-avatar-inner { width:100%; height:100%; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; font-family:'Sora',sans-serif; font-size:1.7rem; font-weight:700; color:#6366f1; }
        .cdd-name { font-family:'Sora',sans-serif; font-size:1.1rem; font-weight:700; color:#1e293b; margin-top:12px; text-align:center; }
        .cdd-role { display:inline-flex; align-items:center; gap:4px; margin-top:6px; padding:3px 12px; border-radius:20px; background:#eef2ff; font-size:0.7rem; font-weight:700; color:#6366f1; text-transform:uppercase; letter-spacing:0.08em; }
        .cdd-active { display:flex; align-items:center; gap:5px; margin-top:8px; font-size:0.7rem; color:#64748b; }
        .cdd-active-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 5px rgba(34,197,94,0.5); }
        .cdd-sep { height:1px; background:linear-gradient(to right,transparent,#eef0f8 40%,#eef0f8 60%,transparent); margin:18px 16px 0; }
        .cdd-stats { display:grid; grid-template-columns:repeat(3,1fr); margin:14px 0 0; gap:1px; background:#f1f5f9; border-radius:12px; overflow:hidden; width:100%; }
        .cdd-stat { background:#fff; padding:12px 6px; text-align:center; transition:background 0.15s; }
        .cdd-stat:hover { background:#fafbff; }
        .cdd-stat-val { font-family:'Sora',sans-serif; font-size:0.95rem; font-weight:700; color:#6366f1; }
        .cdd-stat-lbl { font-size:0.6rem; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; margin-top:2px; }
        .cdd-right { display:flex; flex-direction:column; gap:20px; animation:cddUp 0.35s 0.06s ease both; }
        .cdd-section-head { display:flex; align-items:center; gap:8px; margin-bottom:14px; }
        .cdd-section-bar { width:3px; height:16px; border-radius:3px; background:#6366f1; }
        .cdd-section-title { font-family:'Sora',sans-serif; font-size:0.9rem; font-weight:700; color:#1e293b; }
        .cdd-id-card { background:linear-gradient(135deg,#6366f1 0%,#818cf8 100%); border-radius:18px; padding:22px 26px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 8px 28px rgba(99,102,241,0.22); }
        .cdd-id-label { font-size:0.68rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.65); margin-bottom:4px; }
        .cdd-id-val { font-family:'Sora',sans-serif; font-size:1.8rem; font-weight:700; color:#fff; }
        .cdd-id-badge { display:inline-flex; align-items:center; gap:5px; padding:6px 16px; border-radius:20px; background:rgba(255,255,255,0.18); font-size:0.74rem; font-weight:700; color:#fff; letter-spacing:0.06em; }
        .cdd-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .cdd-info-card { background:#fff; border-radius:16px; padding:18px 20px; display:flex; align-items:center; gap:14px; border:1px solid #eef0f8; box-shadow:0 2px 10px rgba(0,0,0,0.04); transition:all 0.18s ease; }
        .cdd-info-card:hover { box-shadow:0 6px 22px rgba(99,102,241,0.1); transform:translateY(-2px); border-color:#e0e7ff; }
        .cdd-info-icon { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
        .cdd-info-lbl { font-size:0.63rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#94a3b8; margin-bottom:3px; }
        .cdd-info-val { font-size:0.88rem; font-weight:600; color:#1e293b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:190px; }
        .cdd-addr-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .cdd-addr-card { background:#fff; border-radius:14px; padding:16px 18px; border:1px solid #eef0f8; border-left:3px solid #6366f1; box-shadow:0 2px 10px rgba(0,0,0,0.04); transition:all 0.18s; }
        .cdd-addr-card:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(99,102,241,0.1); }
        .cdd-addr-name { font-size:0.85rem; font-weight:700; color:#1e293b; margin-bottom:5px; }
        .cdd-addr-line { font-size:0.76rem; color:#64748b; line-height:1.6; }
        .cdd-addr-ph   { font-size:0.72rem; color:#94a3b8; margin-top:5px; }
        @media(max-width:860px){ .cdd-grid,.cdd-info-grid,.cdd-addr-grid{grid-template-columns:1fr} .cdd-root{padding:16px} }
      `}</style>

      <div className="cdd-root">
        <button className="cdd-back" onClick={() => navigate("/admin/customers")}>← Back to Customers</button>

        <div className="cdd-grid">
          {/* LEFT */}
          <div className="cdd-profile">
            <div className="cdd-banner" />
            <div className="cdd-avatar-area">
              <div className="cdd-avatar-ring"><div className="cdd-avatar-inner">{initials}</div></div>
              <p className="cdd-name">{customer.firstName} {customer.lastName}</p>
              <div className="cdd-role">✦ {customer.role || "Customer"}</div>
              <div className="cdd-active"><div className="cdd-active-dot" /> Active Account</div>
              <div className="cdd-sep" />
              <div className="cdd-stats">
                {[{val:`#${customer.id}`,lbl:"ID"},{val:customer.orders?.length??"—",lbl:"Orders"},{val:customer.address?.length||0,lbl:"Addrs"}].map(s=>(
                  <div key={s.lbl} className="cdd-stat"><div className="cdd-stat-val">{s.val}</div><div className="cdd-stat-lbl">{s.lbl}</div></div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="cdd-right">
            <div className="cdd-id-card">
              <div><div className="cdd-id-label">Customer Identifier</div><div className="cdd-id-val">#{customer.id}</div></div>
              <div className="cdd-id-badge">✓ Verified</div>
            </div>

            <div>
              <div className="cdd-section-head"><div className="cdd-section-bar" /><span className="cdd-section-title">Contact Information</span></div>
              <div className="cdd-info-grid">
                {infoItems.map(item=>(
                  <div className="cdd-info-card" key={item.label}>
                    <div className="cdd-info-icon" style={{background:item.bg}}>{item.emoji}</div>
                    <div style={{minWidth:0}}><div className="cdd-info-lbl">{item.label}</div><div className="cdd-info-val">{item.value}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {customer.address?.length > 0 && (
              <div>
                <div className="cdd-section-head">
                  <div className="cdd-section-bar" style={{background:"#22c55e"}} />
                  <span className="cdd-section-title">Saved Addresses <span style={{fontSize:"0.72rem",fontWeight:400,color:"#94a3b8",marginLeft:8}}>{customer.address.length} saved</span></span>
                </div>
                <div className="cdd-addr-grid">
                  {customer.address.map((addr,i)=>(
                    <div key={i} className="cdd-addr-card">
                      <div className="cdd-addr-name">{addr.firstName} {addr.lastName}</div>
                      <div className="cdd-addr-line">{addr.streetAddress||addr.streetAdress||addr.streetaddress}<br/>{[addr.city,addr.state,addr.zipCode||addr.zipcode].filter(Boolean).join(", ")}</div>
                      {addr.mobile&&<div className="cdd-addr-ph">📞 {addr.mobile}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;