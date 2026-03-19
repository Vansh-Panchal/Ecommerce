import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getUser, updateAddress , deleteAddress } from "../../../State/Auth/Action";
// import { getUser, addAddress, updateAddress, deleteAddress } from "../../../State/Auth/Action";

function SavedAddress() {

  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: ""
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const addresses = auth.user?.address || [];

  /* Remove duplicate addresses */
  const uniqueAddresses = Array.from(
    new Map(
      addresses.map(addr => [
        `${addr.name}-${addr.address}-${addr.city}-${addr.state}-${addr.pincode}-${addr.mobile}`,
        addr
      ])
    ).values()
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    if (editing) {
      dispatch(updateAddress(editing.id, form));
    } else {
      dispatch(addAddress(form));
    }

    setOpen(false);
    setEditing(null);

    setForm({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      mobile: ""
    });
  };

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h2>Saved Addresses</h2>

        <button
          style={styles.addBtn}
          onClick={() => setOpen(true)}
        >
          + Add New Address
        </button>
      </div>

      {uniqueAddresses.length === 0 ? (
        <div style={styles.emptyBox}>
          <p>No saved address found.</p>
        </div>
      ) : (
        <div style={styles.grid}>

          {uniqueAddresses.map((addr) => (

            <div key={addr.id} style={styles.card}>

              <h4 style={styles.name}>{addr.name}</h4>

              <p>{addr.streetaddress}</p>

              <p>{addr.city}, {addr.state}</p>

              <p>{addr.pincode}</p>

              <p>Mobile: {addr.mobile}</p>

              <div style={styles.buttonBox}>

                <button
                  style={styles.editBtn}
                  onClick={() => {
                    setEditing(addr);
                    setForm(addr);
                    setOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => dispatch(deleteAddress(addr.id))}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Popup Form */}

      {open && (
        <div style={styles.popup}>

          <div style={styles.popupCard}>

            <h3>{editing ? "Edit Address" : "Add Address"}</h3>

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="mobile"
              placeholder="Mobile"
              value={form.mobile}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              style={styles.input}
            />

            <div style={styles.popupButtons}>

              <button
                style={styles.saveBtn}
                onClick={handleSubmit}
              >
                Save
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

const styles = {

  container: {
    background: "#f1f3f6",
    padding: "30px",
    minHeight: "80vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px"
  },

  addBtn: {
    background: "#2874f0",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "4px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  name: {
    fontWeight: "600",
    marginBottom: "10px"
  },

  buttonBox: {
    marginTop: "15px",
    display: "flex",
    gap: "10px"
  },

  editBtn: {
    background: "#ffc107",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  },

  emptyBox: {
    background: "white",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center"
  },

  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  popupCard: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },

  popupButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  saveBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "4px",
    cursor: "pointer"
  },

  cancelBtn: {
    background: "#6c757d",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "4px",
    cursor: "pointer"
  }

};

export default SavedAddress;