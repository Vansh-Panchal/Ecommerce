import React from 'react';
import { Modal, Fade, Backdrop, Box } from '@mui/material';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

function AuthModal({ handleClose, open }) {
  const location = useLocation();

  return (
    <>
      <style>{`
        /* Hide scrollbar inside modal box */
        .am-scroll::-webkit-scrollbar { display: none; }
        .am-scroll { scrollbar-width: none; }
      `}</style>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 400,
            sx: {
              backgroundColor: "rgba(5,5,14,0.82)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            },
          },
        }}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <Fade in={open} timeout={420}>
          <Box
            className="am-scroll"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "96vw", sm: "500px", md: "540px" },
              maxHeight: { xs: "95vh", sm: "90vh" },
              overflowY: "auto",
              outline: "none",
              borderRadius: "24px",
            }}
          >
            {location.pathname === "/login" ? <LoginForm /> : <RegisterForm />}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AuthModal;
