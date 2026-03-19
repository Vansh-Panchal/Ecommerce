import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../State/Auth/Action";
import { useDispatch } from "react-redux";

const ProfileSidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutbtn = () => {
    // localStorage.removeItem("jwt");
    dispatch(logout());
    
    navigate("/");
  };

  const menuStyle = {
    padding: "12px 20px",
    display: "block",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500"
  };

  return (
    <div style={{
      width: "250px",
      borderRight: "1px solid #ddd",
      paddingTop: "20px"
    }}>
      
      <h3 style={{ padding: "10px 20px" }}>My Account</h3>

      <NavLink to="/account/profile" style={menuStyle}>
        Personal Details
      </NavLink>

      <NavLink to="/account/address" style={menuStyle}>
        Saved Address
      </NavLink>

      <NavLink to="/account/orders" style={menuStyle}>
        My Orders
      </NavLink>

      <button
        onClick={logoutbtn}
        style={{
          margin: "20px",
          padding: "10px",
          background: "#ef4444",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>
  );
};

export default ProfileSidebar;