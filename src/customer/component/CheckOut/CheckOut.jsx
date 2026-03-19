import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLocation } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Add Delivery Address', 'Order Summary', 'Payment'];

export default function CheckOut() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const step = query.get("step");

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@500;600&display=swap');

        .co-root {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #f5f3ff 0%, #fdf6f0 50%, #f0faf5 100%);
          min-height: 100vh;
        }

        /* ── Stepper bar ── */
        .co-stepper-bar {
          background: #ffffff;
          padding: 20px 40px;
          box-shadow: 0 2px 16px rgba(100, 80, 180, 0.08);
        }

        /* Override MUI stepper colors */
        .co-stepper-bar .MuiStepIcon-root.Mui-active  { color: #7c5cfc !important; }
        .co-stepper-bar .MuiStepIcon-root.Mui-completed { color: #2cb67d !important; }
        .co-stepper-bar .MuiStepIcon-root              { color: #d8d4ec !important; }
        .co-stepper-bar .MuiStepLabel-label            { font-family: 'DM Sans', sans-serif !important; font-size: 0.82rem !important; font-weight: 500 !important; color: #9490b0; }
        .co-stepper-bar .MuiStepLabel-label.Mui-active { color: #5b3fe0 !important; font-weight: 600 !important; }
        .co-stepper-bar .MuiStepLabel-label.Mui-completed { color: #2cb67d !important; }
        .co-stepper-bar .MuiStepConnector-line         { border-color: #e8e4f8 !important; }

        /* ── Back button ── */
        .co-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 20px 40px 0;
          padding: 8px 18px;
          border-radius: 20px;
          border: none;
          background: rgba(124, 92, 252, 0.08);
          color: #7c5cfc;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .co-back-btn:hover:not(:disabled) {
          background: rgba(124, 92, 252, 0.15);
          transform: translateX(-2px);
        }
        .co-back-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* ── All steps complete ── */
        .co-complete {
          text-align: center;
          padding: 80px 20px;
          font-family: 'Fraunces', serif;
          font-size: 1.5rem;
          color: #2cb67d;
        }

        @media (max-width: 600px) {
          .co-stepper-bar { padding: 16px 16px; }
          .co-back-btn    { margin: 16px 16px 0; }
        }
      `}</style>

      <div className="co-root">

        {/* ── Stepper ── */}
        <div className="co-stepper-bar">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={Number(step)}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>

        {activeStep === steps.length ? (
          <div className="co-complete">
            ✅ All steps completed — you're finished!
          </div>
        ) : (
          <>
            <button
              className="co-back-btn"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              ← Back
            </button>

            <div>
              {step == 2 ? <DeliveryAddressForm /> : <OrderSummary />}
            </div>
          </>
        )}

      </div>
    </>
  );
}