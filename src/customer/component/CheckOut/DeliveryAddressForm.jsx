import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';

function DeliveryAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((store) => store);
  const allAddresses = auth?.user?.address || [];

  const savedAddresses = allAddresses.filter((addr, index, self) =>
    index === self.findIndex((a) =>
      a.city?.toLowerCase()  === addr.city?.toLowerCase() &&
      a.state?.toLowerCase() === addr.state?.toLowerCase() &&
      a.mobile               === addr.mobile
    )
  );

  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    firstName: '', lastName: '', address: '',
    cityName: '', state: '', zip: '', phoneNumber: '',
  });

  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return 'This field is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters allowed';
        if (value.trim().length < 2) return 'Minimum 2 characters';
        return '';
      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 10) return 'Please enter a complete address';
        return '';
      case 'cityName':
        if (!value.trim()) return 'City is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters allowed';
        return '';
      case 'state':
        if (!value.trim()) return 'State is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters allowed';
        return '';
      case 'zip':
        if (!value.trim()) return 'PIN code is required';
        if (!/^\d{6}$/.test(value)) return 'Must be 6 digits';
        return '';
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Must be 10 digits';
        return '';
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    const allTouched = {};
    Object.keys(form).forEach((key) => {
      newErrors[key]  = validate(key, form[key]);
      allTouched[key] = true;
    });
    setErrors(newErrors);
    setTouched(allTouched);
    return Object.values(newErrors).every(e => e === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    dispatch(createOrder({
      address: {
        firstName:     form.firstName,
        lastName:      form.lastName,
        streetaddress: form.address,
        city:          form.cityName,
        state:         form.state,
        zipcode:       form.zip,
        mobile:        form.phoneNumber,
      },
      navigate,
    }));
  };

  const handleDeliverHere = (addr) => {
    const mappedAddress = {
      firstName:     addr.firstName     || '',
      lastName:      addr.lastName      || '',
      streetaddress: addr.streetAdress  || addr.streetAddress  || addr.streetaddress || '',
      city:          addr.city          || '',
      state:         addr.state         || '',
      zipcode:       addr.zipCode       || addr.zipcode        || '',
      mobile:        addr.mobile        || '',
    };
    dispatch(createOrder({ address: mappedAddress, navigate }));
  };

  const isFormValid = Object.keys(form).every(
    key => form[key].trim() !== '' && !validate(key, form[key])
  );

  // Soft accent colors for address cards
  const accentColors = [
    { bg: '#f0edff', dot: '#7c5cfc' },
    { bg: '#fff0f5', dot: '#f0567a' },
    { bg: '#e8f8f2', dot: '#2cb67d' },
    { bg: '#fff8e8', dot: '#f5a623' },
    { bg: '#e8f4ff', dot: '#3d8ef8' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:wght@500;600&display=swap');

        .daf-root {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #f5f3ff 0%, #fdf6f0 50%, #f0faf5 100%);
          min-height: 100vh;
          padding: 32px 36px 60px;
        }

        .daf-page-title {
          font-family: 'Fraunces', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #1e1b3a;
          margin-bottom: 6px;
        }
        .daf-page-sub {
          font-size: 0.82rem;
          color: #9490b0;
          margin-bottom: 28px;
          font-weight: 400;
        }

        .daf-layout {
          display: grid;
          grid-template-columns: 1fr 1.55fr;
          gap: 24px;
          align-items: start;
          max-width: 1020px;
        }

        /* ── Panel card ── */
        .daf-panel {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(100, 80, 180, 0.08), 0 1px 4px rgba(0,0,0,0.04);
        }

        .daf-panel-header {
          padding: 16px 22px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7c5cfc;
          background: linear-gradient(135deg, #f5f2ff, #fdf9ff);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .daf-panel-header::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7c5cfc;
          opacity: 0.6;
        }

        /* ── Saved address list ── */
        .daf-addr-list {
          max-height: 480px;
          overflow-y: auto;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .daf-addr-item {
          padding: 14px 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .daf-addr-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.07);
        }
        .daf-addr-item.active {
          box-shadow: 0 6px 24px rgba(124, 92, 252, 0.18);
          transform: translateY(-1px);
        }
        .daf-addr-item.active .daf-addr-name {
          color: #5b3fe0;
        }

        .daf-addr-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e1b3a;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .daf-addr-line {
          font-size: 0.8rem;
          color: #6b6880;
          line-height: 1.55;
        }
        .daf-addr-phone {
          font-size: 0.75rem;
          color: #a09ab8;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .daf-deliver-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 10px;
          padding: 7px 16px;
          border-radius: 20px;
          border: none;
          background: rgba(255,255,255,0.7);
          color: #5b3fe0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .daf-deliver-btn:hover,
        .daf-deliver-btn.selected {
          background: #7c5cfc;
          color: #fff;
          box-shadow: 0 4px 14px rgba(124, 92, 252, 0.35);
          transform: translateY(-1px);
        }

        .daf-no-addr {
          padding: 48px 20px;
          text-align: center;
          color: #c0bdd8;
          font-size: 0.85rem;
        }
        .daf-no-addr-icon {
          font-size: 2.4rem;
          margin-bottom: 10px;
          opacity: 0.35;
        }

        /* ── Form ── */
        .daf-form-body { padding: 22px; }
        .daf-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .daf-full { grid-column: 1 / -1; }

        .daf-field { display: flex; flex-direction: column; gap: 5px; }
        .daf-label {
          font-size: 0.69rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #a09ab8;
        }

        .daf-input {
          width: 100%;
          padding: 10px 13px;
          border-radius: 10px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.87rem;
          color: #1e1b3a;
          background: #f7f5ff;
          outline: none;
          transition: background 0.18s, box-shadow 0.18s;
          box-sizing: border-box;
        }
        .daf-input::placeholder { color: #c5c0d8; }
        .daf-input:focus {
          background: #f0edff;
          box-shadow: 0 0 0 3px rgba(124,92,252,0.15);
        }
        .daf-input.error {
          background: #fff3f5;
          box-shadow: 0 0 0 2px rgba(224,82,82,0.2);
        }
        .daf-input.success {
          background: #f0fff8;
          box-shadow: 0 0 0 2px rgba(44, 182, 125, 0.2);
        }
        .daf-textarea { resize: vertical; min-height: 80px; }

        .daf-error {
          font-size: 0.69rem;
          color: #f0567a;
          display: flex;
          align-items: center;
          gap: 3px;
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-3px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .daf-hint {
          font-size: 0.67rem;
          color: #c5c0d8;
        }

        .daf-submit {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #7c5cfc 0%, #5b3fe0 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 4px 18px rgba(124, 92, 252, 0.3);
        }
        .daf-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(124, 92, 252, 0.42);
        }
        .daf-submit:disabled {
          background: linear-gradient(135deg, #d5d0ea, #c8c4de);
          box-shadow: none;
          cursor: not-allowed;
        }

        .daf-input-wrap { position: relative; }
        .daf-input-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.72rem;
          pointer-events: none;
        }
        .daf-input-wrap .daf-input { padding-right: 30px; }

        @media (max-width: 820px) {
          .daf-root   { padding: 16px 16px 48px; }
          .daf-layout { grid-template-columns: 1fr; }
          .daf-addr-list { max-height: 280px; }
        }
        @media (max-width: 480px) {
          .daf-form-grid { grid-template-columns: 1fr; }
          .daf-full { grid-column: 1; }
        }
      `}</style>

      <div className="daf-root">
        <p className="daf-page-title">Delivery Address</p>
        <p className="daf-page-sub">Choose a saved address or add a new one below</p>

        <div className="daf-layout">

          {/* ── LEFT: Saved Addresses ── */}
          <div className="daf-panel">
            <div className="daf-panel-header">
              Saved Addresses ({savedAddresses.length})
            </div>
            <div className="daf-addr-list">
              {savedAddresses.length > 0 ? (
                savedAddresses.map((addr, idx) => {
                  const accent = accentColors[idx % accentColors.length];
                  return (
                    <div
                      key={idx}
                      className={`daf-addr-item ${selectedId === idx ? 'active' : ''}`}
                      style={{ background: accent.bg }}
                      onClick={() => setSelectedId(idx)}
                    >
                      <p className="daf-addr-name">
                        <span style={{
                          display: 'inline-block',
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          background: accent.dot,
                          color: '#fff',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          textAlign: 'center',
                          lineHeight: '26px',
                          flexShrink: 0,
                        }}>
                          {(addr.firstName?.[0] || '?').toUpperCase()}
                        </span>
                        {addr.firstName} {addr.lastName}
                      </p>

                      {(addr.streetAdress || addr.streetAddress) && (
                        <p className="daf-addr-line">
                          {addr.streetAdress || addr.streetAddress}
                        </p>
                      )}
                      <p className="daf-addr-line">
                        {[addr.city, addr.state, addr.zipCode || addr.zipcode]
                          .filter(Boolean).join(', ')}
                      </p>
                      {addr.mobile && (
                        <p className="daf-addr-phone">📱 {addr.mobile}</p>
                      )}

                      <button
                        className={`daf-deliver-btn ${selectedId === idx ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(idx);
                          handleDeliverHere(addr);
                        }}
                      >
                        Deliver Here →
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="daf-no-addr">
                  <div className="daf-no-addr-icon">📭</div>
                  No saved addresses found.
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: New Address Form ── */}
          <div className="daf-panel">
            <div className="daf-panel-header">Add New Address</div>
            <div className="daf-form-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="daf-form-grid">

                  {/* First Name */}
                  <div className="daf-field">
                    <label className="daf-label" htmlFor="firstName">First Name *</label>
                    <div className="daf-input-wrap">
                      <input
                        className={`daf-input ${touched.firstName ? (errors.firstName ? 'error' : 'success') : ''}`}
                        id="firstName" name="firstName"
                        value={form.firstName} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Raju" autoComplete="given-name"
                      />
                      {touched.firstName && (
                        <span className="daf-input-icon">{errors.firstName ? '✗' : '✓'}</span>
                      )}
                    </div>
                    {touched.firstName && errors.firstName && (
                      <span className="daf-error">⚠ {errors.firstName}</span>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="daf-field">
                    <label className="daf-label" htmlFor="lastName">Last Name *</label>
                    <div className="daf-input-wrap">
                      <input
                        className={`daf-input ${touched.lastName ? (errors.lastName ? 'error' : 'success') : ''}`}
                        id="lastName" name="lastName"
                        value={form.lastName} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Yadav" autoComplete="family-name"
                      />
                      {touched.lastName && (
                        <span className="daf-input-icon">{errors.lastName ? '✗' : '✓'}</span>
                      )}
                    </div>
                    {touched.lastName && errors.lastName && (
                      <span className="daf-error">⚠ {errors.lastName}</span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="daf-field daf-full">
                    <label className="daf-label" htmlFor="address">Street Address *</label>
                    <textarea
                      className={`daf-input daf-textarea ${touched.address ? (errors.address ? 'error' : 'success') : ''}`}
                      id="address" name="address"
                      value={form.address} onChange={handleChange} onBlur={handleBlur}
                      placeholder="House no., street, area, landmark"
                    />
                    {touched.address && errors.address && (
                      <span className="daf-error">⚠ {errors.address}</span>
                    )}
                    {!errors.address && (
                      <span className="daf-hint">{form.address.trim().length}/10 min characters</span>
                    )}
                  </div>

                  {/* City */}
                  <div className="daf-field">
                    <label className="daf-label" htmlFor="cityName">City *</label>
                    <div className="daf-input-wrap">
                      <input
                        className={`daf-input ${touched.cityName ? (errors.cityName ? 'error' : 'success') : ''}`}
                        id="cityName" name="cityName"
                        value={form.cityName} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Yamuna Nagar" autoComplete="address-level2"
                      />
                      {touched.cityName && (
                        <span className="daf-input-icon">{errors.cityName ? '✗' : '✓'}</span>
                      )}
                    </div>
                    {touched.cityName && errors.cityName && (
                      <span className="daf-error">⚠ {errors.cityName}</span>
                    )}
                  </div>

                  {/* State */}
                  <div className="daf-field">
                    <label className="daf-label" htmlFor="state">State *</label>
                    <div className="daf-input-wrap">
                      <input
                        className={`daf-input ${touched.state ? (errors.state ? 'error' : 'success') : ''}`}
                        id="state" name="state"
                        value={form.state} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Haryana" autoComplete="address-level1"
                      />
                      {touched.state && (
                        <span className="daf-input-icon">{errors.state ? '✗' : '✓'}</span>
                      )}
                    </div>
                    {touched.state && errors.state && (
                      <span className="daf-error">⚠ {errors.state}</span>
                    )}
                  </div>

                  {/* ZIP */}
                  <div className="daf-field">
                    <label className="daf-label" htmlFor="zip">PIN Code *</label>
                    <div className="daf-input-wrap">
                      <input
                        className={`daf-input ${touched.zip ? (errors.zip ? 'error' : 'success') : ''}`}
                        id="zip" name="zip"
                        value={form.zip} onChange={handleChange} onBlur={handleBlur}
                        placeholder="135001" autoComplete="postal-code" maxLength={6}
                      />
                      {touched.zip && (
                        <span className="daf-input-icon">{errors.zip ? '✗' : '✓'}</span>
                      )}
                    </div>
                    {touched.zip && errors.zip && (
                      <span className="daf-error">⚠ {errors.zip}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="daf-field">
                    <label className="daf-label" htmlFor="phoneNumber">Phone *</label>
                    <div className="daf-input-wrap">
                      <input
                        className={`daf-input ${touched.phoneNumber ? (errors.phoneNumber ? 'error' : 'success') : ''}`}
                        id="phoneNumber" name="phoneNumber"
                        value={form.phoneNumber} onChange={handleChange} onBlur={handleBlur}
                        placeholder="9876543210" type="tel" autoComplete="tel" maxLength={10}
                      />
                      {touched.phoneNumber && (
                        <span className="daf-input-icon">{errors.phoneNumber ? '✗' : '✓'}</span>
                      )}
                    </div>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <span className="daf-error">⚠ {errors.phoneNumber}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="daf-full">
                    <button type="submit" className="daf-submit" disabled={!isFormValid}>
                      Save &amp; Deliver Here →
                    </button>
                    {!isFormValid && Object.values(touched).some(Boolean) && (
                      <p style={{ fontSize: '0.72rem', color: '#f0567a', textAlign: 'center', marginTop: 8 }}>
                        Please fix the errors above to continue
                      </p>
                    )}
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default DeliveryAddressForm;