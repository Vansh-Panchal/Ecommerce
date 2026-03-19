import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";

/* ─────────────────────────────────────────────────────────────
   CATEGORY DATA
───────────────────────────────────────────────────────────── */
const categoryData = {
  women: {
    Clothing: [
      { label: "Kurtas & Suits", value: "kurtas" },
      { label: "Sarees", value: "sarees" },
      { label: "Lehenga Choli", value: "lehenga_choli" },
      { label: "Tops & Tunics", value: "tops" },
      { label: "Dresses", value: "dresses" },
      { label: "Women Jeans", value: "women_jeans" },
      { label: "Palazzo & Pants", value: "palazzo" },
      { label: "Nightwear", value: "nightwear" },
    ],
    Footwear: [
      { label: "Heels", value: "heels" },
      { label: "Flats", value: "flats" },
      { label: "Sneakers", value: "sneakers" },
      { label: "Sandals & Floaters", value: "sandals" },
      { label: "Boots", value: "boots" },
      { label: "Wedges", value: "wedges" },
    ],
    Accessories: [
      { label: "Watches", value: "watches" },
      { label: "Handbags", value: "bags" },
      { label: "Sunglasses", value: "sunglasses" },
      { label: "Wallets", value: "wallets" },
      { label: "Jewellery", value: "jewellery" },
      { label: "Belts", value: "belts" },
    ],
    Beauty: [
      { label: "Lipsticks", value: "lipsticks" },
      { label: "Foundations", value: "foundations" },
      { label: "Skincare", value: "skincare" },
      { label: "Hair Care", value: "hair_care" },
    ],
  },
  men: {
    "Top Wear": [
      { label: "T-Shirts", value: "tshirts" },
      { label: "Casual Shirts", value: "shirt" },
      { label: "Formal Shirts", value: "formal_shirts" },
      { label: "Sweatshirts", value: "sweatshirts" },
      { label: "Jackets", value: "jackets" },
      { label: "Mens Kurta", value: "mens_kurta" },
    ],
    "Bottom Wear": [
      { label: "Men Jeans", value: "men_jeans" },
      { label: "Casual Trousers", value: "casual_trousers" },
      { label: "Formal Trousers", value: "formal_trousers" },
      { label: "Track Pants", value: "track_pants" },
      { label: "Shorts", value: "shorts" },
    ],
    Footwear: [
      { label: "Casual Shoes", value: "casual_shoes" },
      { label: "Sports Shoes", value: "sports_shoes" },
      { label: "Formal Shoes", value: "formal_shoes" },
      { label: "Sneakers", value: "sneakers" },
      { label: "Sandals", value: "sandals" },
      { label: "Boots", value: "boots" },
    ],
    Accessories: [
      { label: "Watches", value: "watches" },
      { label: "Wallets", value: "wallets" },
      { label: "Bags", value: "bags" },
      { label: "Sunglasses", value: "sunglasses" },
      { label: "Belts", value: "belts" },
    ],
  },
  kids: {
    Clothing: [
      { label: "T-Shirts", value: "kids_tshirts" },
      { label: "Shirts", value: "kids_shirts" },
      { label: "Jeans", value: "kids_jeans" },
      { label: "Dresses", value: "kids_dresses" },
      { label: "Ethnic Wear", value: "kids_ethnic_wear" },
      { label: "Winterwear", value: "kids_winterwear" },
    ],
    Footwear: [
      { label: "Sneakers", value: "kids_sneakers" },
      { label: "Sandals", value: "kids_sandals" },
      { label: "School Shoes", value: "kids_school_shoes" },
      { label: "Flip Flops", value: "kids_flip_flops" },
      { label: "Boots", value: "kids_boots" },
    ],
    Accessories: [
      { label: "Bags & Backpacks", value: "kids_bags" },
      { label: "Caps & Hats", value: "kids_caps" },
      { label: "Sunglasses", value: "kids_sunglasses" },
      { label: "Belts", value: "kids_belts" },
    ],
    "Toys & Games": [
      { label: "Action Figures", value: "action_figures" },
      { label: "Board Games", value: "board_games" },
      { label: "Educational Toys", value: "educational_toys" },
      { label: "Outdoor Play", value: "outdoor_play" },
    ],
  },
  electronics: {
    "Mobiles & Tablets": [
      { label: "Smartphones", value: "smartphones" },
      { label: "Tablets", value: "tablets" },
      { label: "Mobile Accessories", value: "mobile_accessories" },
      { label: "Smart Watches", value: "smart_watches" },
      { label: "TWS Earbuds", value: "earbuds" },
    ],
    Computers: [
      { label: "Laptops", value: "laptops" },
      { label: "Desktops", value: "desktops" },
      { label: "Monitors", value: "monitors" },
      { label: "Printers", value: "printers" },
      { label: "PC Accessories", value: "pc_accessories" },
    ],
    "TV & Audio": [
      { label: "Televisions", value: "televisions" },
      { label: "Speakers", value: "speakers" },
      { label: "Headphones", value: "headphones" },
      { label: "Home Theatre", value: "home_theatre" },
    ],
    "Cameras & Gadgets": [
      { label: "DSLR Cameras", value: "dslr" },
      { label: "Action Cameras", value: "action_cameras" },
      { label: "Drones", value: "drones" },
      { label: "Power Banks", value: "power_banks" },
    ],
  },
  home: {
    Furniture: [
      { label: "Sofas & Couches", value: "sofas" },
      { label: "Beds & Mattresses", value: "beds" },
      { label: "Dining Tables", value: "dining_tables" },
      { label: "Wardrobes", value: "wardrobes" },
      { label: "Study Tables", value: "study_tables" },
      { label: "Bookshelves", value: "bookshelves" },
    ],
    "Kitchen & Dining": [
      { label: "Cookware Sets", value: "cookware" },
      { label: "Dinner Sets", value: "dinner_sets" },
      { label: "Storage & Containers", value: "storage" },
      { label: "Kitchen Appliances", value: "kitchen_appliances" },
      { label: "Water Bottles", value: "water_bottles" },
    ],
    "Home Decor": [
      { label: "Wall Art & Paintings", value: "wall_art" },
      { label: "Cushions & Pillows", value: "cushions" },
      { label: "Curtains", value: "curtains" },
      { label: "Clocks", value: "clocks" },
      { label: "Plants & Pots", value: "plants" },
    ],
    "Bed & Bath": [
      { label: "Bedsheets", value: "bedsheets" },
      { label: "Blankets & Quilts", value: "blankets" },
      { label: "Towels", value: "towels" },
      { label: "Bath Accessories", value: "bath_accessories" },
    ],
  },
  sports: {
    "Fitness & Gym": [
      { label: "Dumbbells & Barbells", value: "dumbbells" },
      { label: "Resistance Bands", value: "resistance_bands" },
      { label: "Yoga Mats", value: "yoga_mats" },
      { label: "Treadmills", value: "treadmills" },
      { label: "Protein Supplements", value: "supplements" },
    ],
    "Outdoor Sports": [
      { label: "Cricket", value: "cricket" },
      { label: "Football", value: "football" },
      { label: "Badminton", value: "badminton" },
      { label: "Tennis", value: "tennis" },
      { label: "Cycling", value: "cycling" },
    ],
    "Sports Clothing": [
      { label: "Sports T-Shirts", value: "sports_tshirts" },
      { label: "Track Pants", value: "track_pants" },
      { label: "Sports Shoes", value: "sports_shoes" },
      { label: "Compression Wear", value: "compression_wear" },
    ],
    "Adventure & Water": [
      { label: "Swimming", value: "swimming" },
      { label: "Camping & Hiking", value: "camping" },
      { label: "Skating", value: "skating" },
    ],
  },
};

const topLevelLabels = {
  women: "Women",
  men: "Men",
  kids: "Kids",
  electronics: "Electronics",
  home: "Home & Furniture",
  sports: "Sports",
};

/* ─────────────────────────────────────────────────────────────
   SMART SIZE ENGINE
───────────────────────────────────────────────────────────── */

// Size presets — each has a label, icon, hint, and size names
const SIZE_PRESETS = {
  apparel: {
    type: "apparel",
    label: "Apparel Sizes",
    icon: "👕",
    hint: "Standard clothing sizes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  bottomwear: {
    type: "bottomwear",
    label: "Waist Sizes (inches)",
    icon: "👖",
    hint: "Standard bottom-wear waist sizes",
    sizes: ["28", "30", "32", "34", "36", "38"],
  },
  shoe: {
    type: "shoe",
    label: "Shoe Sizes (UK)",
    icon: "👟",
    hint: "Standard UK shoe sizes",
    sizes: ["6", "7", "8", "9", "10", "11"],
  },
  kids_clothing: {
    type: "kids_clothing",
    label: "Kids Age Sizes",
    icon: "🧒",
    hint: "Age-based kids clothing sizes",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  kids_shoe: {
    type: "kids_shoe",
    label: "Kids Shoe Sizes (UK)",
    icon: "👟",
    hint: "UK kids shoe sizes",
    sizes: ["1", "2", "3", "4", "5"],
  },
  none: {
    type: "none",
    label: "No Sizes Applicable",
    icon: "📦",
    hint: "This product type doesn't require size selection",
    sizes: [],
  },
};

// Third-level overrides (most granular — checked first)
const thirdLevelMap = {
  women_jeans:     "bottomwear",
  palazzo:         "bottomwear",
  men_jeans:       "bottomwear",
  casual_trousers: "bottomwear",
  formal_trousers: "bottomwear",
  track_pants:     "bottomwear",
  shorts:          "bottomwear",
  sports_shoes:    "shoe",
  swimming:        "apparel",
};

// Second-level overrides
const secondLevelMap = {
  "Footwear":        "shoe",
  "Top Wear":        "apparel",
  "Bottom Wear":     "bottomwear",
  "Sports Clothing": "apparel",
  "Clothing":        "apparel",
};

function getSizeConfig(top, second, third) {
  if (!top) return null;

  // 1. Most specific: third-level override
  if (third && thirdLevelMap[third]) {
    return SIZE_PRESETS[thirdLevelMap[third]];
  }

  // 2. Kids special handling
  if (top === "kids") {
    if (second === "Footwear") return SIZE_PRESETS.kids_shoe;
    if (second === "Clothing") return SIZE_PRESETS.kids_clothing;
    if (second) return SIZE_PRESETS.none;
    return null; // wait for second level
  }

  // 3. Second-level mapping
  if (second && secondLevelMap[second]) {
    return SIZE_PRESETS[secondLevelMap[second]];
  }

  // 4. Top-level fallbacks (electronics, home always "none")
  if (top === "electronics" || top === "home") return SIZE_PRESETS.none;

  // 5. Sports — need second level to decide
  if (top === "sports") {
    if (second === "Fitness & Gym") return SIZE_PRESETS.none;
    if (second === "Outdoor Sports") return SIZE_PRESETS.none;
    if (second === "Adventure & Water") return SIZE_PRESETS.none;
    if (second) return SIZE_PRESETS.none;
    return null;
  }

  // 6. Women/Men Accessories & Beauty → none
  if (second === "Accessories" || second === "Beauty") return SIZE_PRESETS.none;

  // 7. Still waiting for second-level
  return null;
}

/* ─────────────────────────────────────────────────────────────
   SUCCESS POPUP
───────────────────────────────────────────────────────────── */
const SuccessPopup = ({ onClose }) => (
  <div className="popup-overlay">
    <div className="popup-box">
      <div className="popup-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="popup-title">Product Added Successfully!</h2>
      <p className="popup-message">Your product has been added to the store.</p>
      <button className="popup-btn" onClick={onClose}>OK</button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const AddProduct = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [sizeConfig, setSizeConfig] = useState(null);

  const initialFormState = {
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    quantity: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    sizes: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  // ── Auto-recalculate sizes whenever category changes ──
  useEffect(() => {
    const config = getSizeConfig(
      formData.topLevelCategory,
      formData.secondLevelCategory,
      formData.thirdLevelCategory
    );
    setSizeConfig(config);
    const newSizes = config ? config.sizes.map((name) => ({ name, quantity: "" })) : [];
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
  }, [formData.topLevelCategory, formData.secondLevelCategory, formData.thirdLevelCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "topLevelCategory" && { secondLevelCategory: "", thirdLevelCategory: "" }),
      ...(name === "secondLevelCategory" && { thirdLevelCategory: "" }),
    }));
  };

  const handleSizeQuantityChange = (e, index) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index].quantity = e.target.value;
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData));
    console.log("Submitted Data:", formData);
    setShowPopup(true);
    setFormData(initialFormState);
    setSizeConfig(null);
  };

  const secondLevelOptions = formData.topLevelCategory
    ? Object.keys(categoryData[formData.topLevelCategory])
    : [];

  const thirdLevelOptions =
    formData.topLevelCategory && formData.secondLevelCategory
      ? categoryData[formData.topLevelCategory][formData.secondLevelCategory] || []
      : [];

  return (
    <div className="add-product-container">

      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}

      <div className="page-header">
        <div className="page-header-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <div>
          <h1 className="page-title">Add New Product</h1>
          <p className="page-subtitle">Fill in the details to add a new product to your store</p>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>

        {/* ── Image URL ── */}
        <div className="form-section">
          <label className="section-label">Product Image</label>
          <div className="form-row full">
            <input type="text" name="imageUrl" placeholder="https://example.com/image.jpg"
              onChange={handleChange} value={formData.imageUrl} className="form-input" />
          </div>
        </div>

        {/* ── Brand + Title ── */}
        <div className="form-section">
          <label className="section-label">Product Info</label>
          <div className="form-row two">
            <input type="text" name="brand" placeholder="Brand Name" onChange={handleChange} value={formData.brand} className="form-input" />
            <input type="text" name="title" placeholder="Product Title" onChange={handleChange} value={formData.title} className="form-input" />
          </div>
        </div>

        {/* ── Color + Quantity ── */}
        <div className="form-row two">
          <input type="text" name="color" placeholder="Color (e.g. Navy Blue)" onChange={handleChange} value={formData.color} className="form-input" />
          <input type="number" name="quantity" placeholder="Total Quantity" onChange={handleChange} value={formData.quantity} className="form-input" />
        </div>

        {/* ── Pricing ── */}
        <div className="form-section">
          <label className="section-label">Pricing</label>
          <div className="form-row three">
            <div className="input-with-prefix">
              <span className="prefix">₹</span>
              <input type="number" name="price" placeholder="Original Price" onChange={handleChange} value={formData.price} className="form-input prefix-input" />
            </div>
            <div className="input-with-prefix">
              <span className="prefix">₹</span>
              <input type="number" name="discountedPrice" placeholder="Discounted Price" onChange={handleChange} value={formData.discountedPrice} className="form-input prefix-input" />
            </div>
            <div className="input-with-prefix">
              <span className="prefix">%</span>
              <input type="number" name="discountPercent" placeholder="Discount %" onChange={handleChange} value={formData.discountPercent} className="form-input prefix-input" />
            </div>
          </div>
        </div>

        {/* ── Categories ── */}
        <div className="form-section">
          <label className="section-label">Category</label>
          <div className="form-row three">
            <select name="topLevelCategory" value={formData.topLevelCategory} onChange={handleChange} className="form-select">
              <option value="">Top Level Category</option>
              {Object.keys(topLevelLabels).map((key) => (
                <option key={key} value={key}>{topLevelLabels[key]}</option>
              ))}
            </select>
            <select name="secondLevelCategory" value={formData.secondLevelCategory} onChange={handleChange} disabled={!formData.topLevelCategory} className="form-select">
              <option value="">Second Level</option>
              {secondLevelOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select name="thirdLevelCategory" value={formData.thirdLevelCategory} onChange={handleChange} disabled={!formData.secondLevelCategory} className="form-select">
              <option value="">Third Level</option>
              {thirdLevelOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="form-section">
          <label className="section-label">Description</label>
          <div className="form-row full">
            <textarea name="description" placeholder="Write a detailed product description..."
              rows="4" onChange={handleChange} value={formData.description} className="form-textarea" />
          </div>
        </div>

        {/* ── DYNAMIC SIZE SECTION ── */}
        <div className="form-section">
          <label className="section-label">Size & Stock</label>

          {/* State 1: No category selected yet */}
          {!sizeConfig && (
            <div style={{
              padding: "22px", borderRadius: "12px",
              background: "#f8fafc", border: "1.5px dashed #cbd5e1",
              textAlign: "center", color: "#94a3b8", fontSize: "0.85rem",
            }}>
              👆 Select a category above — sizes will appear automatically
            </div>
          )}

          {/* State 2: Product has no sizes (electronics, accessories, etc.) */}
          {sizeConfig && sizeConfig.type === "none" && (
            <div style={{
              padding: "14px 20px", borderRadius: "12px",
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <span style={{ fontSize: "1.4rem" }}>{sizeConfig.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#15803d", fontSize: "0.85rem" }}>
                  {sizeConfig.label}
                </div>
                <div style={{ color: "#4ade80", fontSize: "0.75rem", marginTop: "2px" }}>
                  {sizeConfig.hint} — only total quantity is needed
                </div>
              </div>
            </div>
          )}

          {/* State 3: Product has sizes — show size cards */}
          {sizeConfig && sizeConfig.sizes.length > 0 && (
            <>
              {/* Type badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "5px 14px", borderRadius: "20px",
                background: "#eff6ff", border: "1px solid #bfdbfe",
                color: "#2563eb", fontSize: "0.75rem", fontWeight: 700,
                marginBottom: "14px",
              }}>
                <span>{sizeConfig.icon}</span>
                {sizeConfig.label}
                <span style={{ color: "#93c5fd", fontWeight: 400 }}>· {sizeConfig.hint}</span>
              </div>

              <div className="size-grid">
                {formData.sizes.map((size, index) => (
                  <div className="size-card" key={index}>
                    <div className="size-badge">{size.name}</div>
                    <input
                      type="number"
                      value={size.quantity}
                      onChange={(e) => handleSizeQuantityChange(e, index)}
                      placeholder="Qty"
                      className="form-input size-qty-input"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button type="submit" className="submit-btn mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          ADD NEW PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;