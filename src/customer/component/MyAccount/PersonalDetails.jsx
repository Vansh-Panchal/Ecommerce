import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../State/Auth/Action";

function PersonalDetails() {

  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch logged in user
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Update state when user arrives from backend
  useEffect(() => {
    if (auth.user) {
      setUser({
        firstName: auth.user.firstName || "",
        lastName: auth.user.lastName || "",
        email: auth.user.email || "",
        mobile: auth.user.mobile || "NULL"
      });
    }
  }, [auth.user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {

    // Later we will call update API
    console.log("Updated user", user);
    dispatch(updateUser(user));
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.header}>
          <h2 style={styles.title}>Personal Information</h2>

          {!isEditing ? (
            <button
              style={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button
              style={styles.saveBtn}
              onClick={handleSave}
            >
              Save
            </button>
          )}

        </div>

        <div style={styles.form}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>First Name</label>
            <input
              style={styles.input}
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              style={styles.input}
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={{ ...styles.input, backgroundColor: "#f5f5f5" }}
              name="email"
              value={user.email}
              disabled
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile</label>
            <input
              style={styles.input}
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    backgroundColor: "#f1f3f6",
    minHeight: "80vh",
    padding: "40px",
    display: "flex",
    justifyContent: "center"
  },

  card: {
    width: "650px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  title: {
    fontSize: "22px",
    fontWeight: "600"
  },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },

  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555"
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px"
  },

  editBtn: {
    backgroundColor: "#2874f0",
    color: "white",
    border: "none",
    padding: "8px 18px",
    borderRadius: "4px",
    cursor: "pointer"
  },

  saveBtn: {
    backgroundColor: "#388e3c",
    color: "white",
    border: "none",
    padding: "8px 18px",
    borderRadius: "4px",
    cursor: "pointer"
  }

};

export default PersonalDetails;