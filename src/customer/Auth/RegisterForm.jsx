import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../State/Auth/Action';

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e) => setValues((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({
      firstName: values.firstName,
      lastName:  values.lastName,
      email:     values.email,
      password:  values.password,
    }));
  };

  // Password strength
  const len = values.password.length;
  const strength = len === 0 ? 0 : len < 6 ? 1 : len < 10 ? 2 : 3;
  const strengthColor = ["transparent", "#e05252", "#f5a623", "#2e7d32"][strength];
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];

  const inputStyle = {
    width: "100%", padding: "10px 12px",
    border: "1.5px solid #ddd", borderRadius: "8px",
    fontSize: "0.88rem", color: "#1a1a1a",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: "0.8rem",
    fontWeight: 600, color: "#444", marginBottom: "6px",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      padding: "24px 16px",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "40px 36px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}>

        {/* Header */}
        <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px" }}>
          Create Account
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "28px" }}>
          Fill in your details to get started.
        </p>

        <form onSubmit={handleSubmit}>

          {/* First + Last Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text" name="firstName"
                value={values.firstName}
                onChange={handleChange}
                placeholder="Raju"
                required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e  => e.target.style.borderColor = "#ddd"}
              />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text" name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Yadav"
                required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e  => e.target.style.borderColor = "#ddd"}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email" name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#c9a84c"}
              onBlur={e  => e.target.style.borderColor = "#ddd"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "6px" }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                style={{ ...inputStyle, paddingRight: "52px" }}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e  => e.target.style.borderColor = "#ddd"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "10px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", color: "#aaa",
                  fontSize: "0.72rem", fontWeight: 600,
                }}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Strength bar */}
          {values.password && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{
                    width: "36px", height: "3px", borderRadius: "2px",
                    background: i <= strength ? strengthColor : "#eee",
                    transition: "background 0.3s",
                  }} />
                ))}
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
          )}
          {!values.password && <div style={{ marginBottom: "20px" }} />}

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: "100%", padding: "11px",
              background: "#c9a84c", color: "#fff",
              border: "none", borderRadius: "8px",
              fontSize: "0.88rem", fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.04em",
            }}
          >
            Create Account
          </button>
        </form>

        {/* Switch */}
        <p style={{ textAlign: "center", marginTop: "22px", fontSize: "0.82rem", color: "#888" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#c9a84c", fontWeight: 700, cursor: "pointer" }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;