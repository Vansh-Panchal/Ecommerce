import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, TextField, Paper, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, updateUser } from "../../State/Auth/Action";
import { useNavigate } from "react-router-dom";
// import { getUser, updateUser, logout } from "../State/Auth/Action";

function AdminProfile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const [editMode,setEditMode] = useState(false);

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    mobile:""
  });

  const [errors,setErrors] = useState({
    firstName:"",
    lastName:"",
    mobile:""
  });


  useEffect(()=>{
    dispatch(getUser());
  },[dispatch]);


  useEffect(()=>{
    if(user){
      setFormData({
        firstName:user.firstName || "",
        lastName:user.lastName || "",
        mobile:user.mobile || ""
      });
    }
  },[user]);


  const validate = (name,value)=>{

    let error="";

    if(name==="firstName" || name==="lastName"){

      const regex = /^[A-Za-z]+$/;

      if(!regex.test(value)){
        error="Only alphabets allowed";
      }

    }

    if(name==="mobile"){

      const regex=/^[0-9]*$/;

      if(!regex.test(value)){
        error="Only numbers allowed";
      }
      else if(value.length>10){
        error="Mobile number cannot exceed 10 digits";
      }

    }

    setErrors({
      ...errors,
      [name]:error
    });

  };


  const handleChange = (e)=>{

    const {name,value}=e.target;

    if(name==="mobile" && value.length>10){
      return;
    }

    setFormData({
      ...formData,
      [name]:value
    });

    validate(name,value);

  };


  const handleUpdateProfile = ()=>{

    if(
      errors.firstName ||
      errors.lastName ||
      errors.mobile ||
      formData.mobile.length !== 10
    ){
      alert("Please fix validation errors");
      return;
    }

    dispatch(updateUser(formData));

    setEditMode(false);

  };


  const handleLogout = () => {

  dispatch(logout());
  navigate("/");

};


  return (

    <Box sx={{p:4}}>

      <Typography sx={{fontSize:"1.6rem",fontWeight:700,mb:3}}>
        Admin Profile
      </Typography>


      <Box
        sx={{
          display:"grid",
          gridTemplateColumns:{xs:"1fr", md:"2fr 1fr"},
          gap:3
        }}
      >

        {/* LEFT SIDE */}

        <Paper
          elevation={0}
          sx={{
            p:4,
            borderRadius:"14px",
            boxShadow:"0 6px 25px rgba(0,0,0,0.05)"
          }}
        >

          <Box sx={{display:"flex",alignItems:"center",gap:3,mb:3}}>

            <Avatar
              sx={{
                width:70,
                height:70,
                fontSize:"1.5rem",
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)"
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>

            <Box>

              <Typography sx={{fontWeight:700,fontSize:"1.1rem"}}>
                {user?.firstName} {user?.lastName}
              </Typography>

              <Typography sx={{fontSize:"0.9rem",color:"#64748b"}}>
                {user?.email}
              </Typography>

              <Typography sx={{fontSize:"0.8rem",color:"#a5b4fc"}}>
                {user?.role}
              </Typography>

            </Box>

          </Box>

          <Divider sx={{mb:3}} />

          <Box sx={{display:"grid",gap:2}}>

            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <TextField
              label="Email"
              value={user?.email || ""}
              disabled
              fullWidth
            />

            <TextField
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              error={!!errors.mobile}
              helperText={errors.mobile || "Mobile number must be 10 digits"}
            />

          </Box>

          <Box sx={{mt:3}}>

            <Button
              variant="contained"
              onClick={()=>{
                if(editMode){
                  handleUpdateProfile();
                }else{
                  setEditMode(true);
                }
              }}
              sx={{
                background:"#6366f1",
                "&:hover":{background:"#4f46e5"}
              }}
            >
              {editMode ? "Save Profile" : "Edit Profile"}
            </Button>

          </Box>

          <Divider sx={{my:4}} />

          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Paper>


        {/* RIGHT SIDE */}

        <Box sx={{display:"flex",flexDirection:"column",gap:3}}>

          <Paper
            elevation={0}
            sx={{
              p:3,
              borderRadius:"14px",
              boxShadow:"0 6px 25px rgba(0,0,0,0.05)"
            }}
          >

            <Typography sx={{fontWeight:700,mb:2}}>
              Account Information
            </Typography>

            <Typography sx={{fontSize:"0.9rem",mb:1}}>
              <b>User ID:</b> {user?.id}
            </Typography>

            <Typography sx={{fontSize:"0.9rem",mb:1}}>
              <b>Role:</b> {user?.role}
            </Typography>

            <Typography sx={{fontSize:"0.9rem"}}>
              <b>Status:</b> Active
            </Typography>

          </Paper>

        </Box>

      </Box>

    </Box>

  );
}

export default AdminProfile;