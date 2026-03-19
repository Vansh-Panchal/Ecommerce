import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Dynamic Page Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default ProfileLayout;