// ─────────────────────────────────────────────────────────────────
//  FilterData.js  —  Category-aware size filters
// ─────────────────────────────────────────────────────────────────

// ── Clothing sizes (tops, kurtas, dresses, shirts, etc.) ──────────
const clothingSizes = [
  { label: "XS",   values: "XS"   },
  { label: "S",    values: "S"    },
  { label: "M",    values: "M"    },
  { label: "L",    values: "L"    },
  { label: "XL",   values: "XL"   },
  { label: "XXL",  values: "XXL"  },
  { label: "3XL",  values: "3XL"  },
];

// ── Bottom wear (jeans, trousers, shorts) — waist sizes ──────────
const bottomSizes = [
  { label: "28",   values: "28"   },
  { label: "30",   values: "30"   },
  { label: "32",   values: "32"   },
  { label: "34",   values: "34"   },
  { label: "36",   values: "36"   },
  { label: "38",   values: "38"   },
  { label: "40",   values: "40"   },
  { label: "42",   values: "42"   },
];

// ── Footwear (shoes, sandals, boots, sneakers) — UK/IN sizes ─────
const shoeSizes = [
  { label: "UK 4",  values: "4"   },
  { label: "UK 5",  values: "5"   },
  { label: "UK 6",  values: "6"   },
  { label: "UK 7",  values: "7"   },
  { label: "UK 8",  values: "8"   },
  { label: "UK 9",  values: "9"   },
  { label: "UK 10", values: "10"  },
  { label: "UK 11", values: "11"  },
];

// ── Kids clothing sizes ───────────────────────────────────────────
const kidsSizes = [
  { label: "0–6 months",   values: "0-6M"  },
  { label: "6–12 months",  values: "6-12M" },
  { label: "1–2 years",    values: "1-2Y"  },
  { label: "3–4 years",    values: "3-4Y"  },
  { label: "5–6 years",    values: "5-6Y"  },
  { label: "7–8 years",    values: "7-8Y"  },
  { label: "9–10 years",   values: "9-10Y" },
  { label: "11–12 years",  values: "11-12Y"},
  { label: "13–14 years",  values: "13-14Y"},
];

// ── Innerwear / Lingerie (cup + band or S/M/L) ────────────────────
const innerwearSizes = [
  { label: "S",    values: "S"    },
  { label: "M",    values: "M"    },
  { label: "L",    values: "L"    },
  { label: "XL",   values: "XL"   },
  { label: "30B",  values: "30B"  },
  { label: "32B",  values: "32B"  },
  { label: "34B",  values: "34B"  },
  { label: "36B",  values: "36B"  },
  { label: "32C",  values: "32C"  },
  { label: "34C",  values: "34C"  },
];

// ── One-size items (bags, accessories, wallets, belts, etc.) ─────
const oneSizes = [
  { label: "One Size", values: "ONE SIZE" },
];

// ── Electronics (storage, RAM variants) ──────────────────────────
const electronicsSizes = [
  { label: "64GB",   values: "64GB"   },
  { label: "128GB",  values: "128GB"  },
  { label: "256GB",  values: "256GB"  },
  { label: "512GB",  values: "512GB"  },
  { label: "1TB",    values: "1TB"    },
];

// ── Furniture / Home — size variants ─────────────────────────────
const homeSizes = [
  { label: "Small",         values: "SMALL"         },
  { label: "Medium",        values: "MEDIUM"        },
  { label: "Large",         values: "LARGE"         },
  { label: "Single Bed",    values: "SINGLE"        },
  { label: "Double Bed",    values: "DOUBLE"        },
  { label: "King Size",     values: "KING"          },
  { label: "Queen Size",    values: "QUEEN"         },
];

// ─────────────────────────────────────────────────────────────────
//  Category → size mapping
//  Keys are levelThree param values (lowercase).
//  Add more entries as your routes expand.
// ─────────────────────────────────────────────────────────────────
export const CATEGORY_SIZE_MAP = {
  // ── Women clothing ──
  tops:               clothingSizes,
  tshirts:            clothingSizes,
  kurtas:             clothingSizes,
  kurtasets:          clothingSizes,
  dresses:            clothingSizes,
  saree:              clothingSizes,
  lehenga:            clothingSizes,
  blouse:             clothingSizes,
  lengha:             clothingSizes,
  jacket:             clothingSizes,
  sweatshirts:        clothingSizes,
  hoodie:             clothingSizes,
  sweaters:           clothingSizes,
  coord:              clothingSizes,
  shrug:              clothingSizes,
  lounge_tops:        clothingSizes,
  lounge_tshirts:     clothingSizes,
  lounge_shorts:      bottomSizes,
  track_pants:        bottomSizes,

  // ── Bottoms ──
  jeans:              bottomSizes,
  trousers:           bottomSizes,
  shorts:             bottomSizes,
  skirts:             bottomSizes,
  palazzos:           clothingSizes,
  joggers:            bottomSizes,

  // ── Innerwear / Lingerie ──
  bra:                innerwearSizes,
  lingerie:           innerwearSizes,
  nightdress:         clothingSizes,
  innerwear:          innerwearSizes,

  // ── Men clothing ──
  shirt:              clothingSizes,
  casual_shirts:      clothingSizes,
  formal_shirts:      clothingSizes,
  men_tshirts:        clothingSizes,
  men_kurtas:         clothingSizes,
  men_jeans:          bottomSizes,
  men_trousers:       bottomSizes,
  men_shorts:         bottomSizes,
  blazer:             clothingSizes,
  suits:              clothingSizes,
  men_jackets:        clothingSizes,
  men_sweaters:       clothingSizes,
  men_sweatshirts:    clothingSizes,
  men_hoodies:        clothingSizes,
  men_innerwear:      clothingSizes,
  men_loungewear:     clothingSizes,

  // ── Footwear ──
  shoes:              shoeSizes,
  sneakers:           shoeSizes,
  sandals:            shoeSizes,
  heels:              shoeSizes,
  flats:              shoeSizes,
  boots:              shoeSizes,
  loafers:            shoeSizes,
  sports_shoes:       shoeSizes,
  men_shoes:          shoeSizes,
  men_sandals:        shoeSizes,
  men_boots:          shoeSizes,
  flip_flops:         shoeSizes,
  slippers:           shoeSizes,

  // ── Kids ──
  kids_tops:          kidsSizes,
  kids_tshirts:       kidsSizes,
  kids_dresses:       kidsSizes,
  kids_bottomwear:    kidsSizes,
  boys_tshirts:       kidsSizes,
  girls_dresses:      kidsSizes,
  kids_shoes:         shoeSizes,
  kids_innerwear:     kidsSizes,

  // ── Electronics ──
  mobiles:            electronicsSizes,
  laptops:            electronicsSizes,
  tablets:            electronicsSizes,
  storage:            electronicsSizes,

  // ── Home & Furniture ──
  bed:                homeSizes,
  sofa:               homeSizes,
  mattress:           homeSizes,
  curtains:           homeSizes,
  bedsheets:          homeSizes,

  // ── Accessories / Bags (one-size) ──
  bags:               oneSizes,
  handbags:           oneSizes,
  backpacks:          oneSizes,
  wallets:            oneSizes,
  belts:              oneSizes,
  sunglasses:         oneSizes,
  watches:            oneSizes,
  jewellery:          oneSizes,
};

/**
 * Returns the correct size options for a given category slug.
 * Falls back to clothingSizes if the category is unrecognized.
 *
 * @param {string|undefined} categorySlug  — value of params.levelThree
 * @returns {{ label: string, values: string }[]}
 */
export const getSizesForCategory = (categorySlug) => {
  if (!categorySlug) return clothingSizes;
  const key = categorySlug.toLowerCase().replace(/ /g, "_");
  return CATEGORY_SIZE_MAP[key] ?? clothingSizes;
};

// ─────────────────────────────────────────────────────────────────
//  Static filters (color, price, discount, availability)
//  Size is intentionally excluded — it's injected dynamically
//  inside Product.jsx via getSizesForCategory()
// ─────────────────────────────────────────────────────────────────

// Checkbox filters (multi-select)
export const filters = [
  {
    id: "color",
    name: "Color",
    Option: [
      { label: "White",       values: "white"       },
      { label: "Black",       values: "black"       },
      { label: "Red",         values: "red"         },
      { label: "Blue",        values: "blue"        },
      { label: "Navy Blue",   values: "navy blue"   },
      { label: "Green",       values: "green"       },
      { label: "Pink",        values: "pink"        },
      { label: "Yellow",      values: "yellow"      },
      { label: "Orange",      values: "orange"      },
      { label: "Purple",      values: "purple"      },
      { label: "Brown",       values: "brown"       },
      { label: "Beige",       values: "beige"       },
      { label: "Grey",        values: "grey"        },
      { label: "Maroon",      values: "maroon"      },
      { label: "Teal",        values: "teal"        },
      { label: "Multicolor",  values: "multicolor"  },
    ],
  },
];

// Radio filters (single-select) — size is NOT here (injected dynamically)
export const singleFilter = [
  {
    id: "price",
    name: "Price Range",
    Option: [
      { label: "Under ₹500",          values: "0-500"       },
      { label: "₹500 – ₹1,000",       values: "500-1000"    },
      { label: "₹1,000 – ₹2,000",     values: "1000-2000"   },
      { label: "₹2,000 – ₹5,000",     values: "2000-5000"   },
      { label: "₹5,000 – ₹10,000",    values: "5000-10000"  },
      { label: "Above ₹10,000",        values: "10000-100000"},
    ],
  },
  {
    id: "discount",
    name: "Discount",
    Option: [
      { label: "10% and above",  values: "10"  },
      { label: "20% and above",  values: "20"  },
      { label: "30% and above",  values: "30"  },
      { label: "40% and above",  values: "40"  },
      { label: "50% and above",  values: "50"  },
      { label: "60% and above",  values: "60"  },
      { label: "70% and above",  values: "70"  },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    Option: [
      { label: "In Stock",      values: "true"  },
      { label: "Out of Stock",  values: "false" },
    ],
  },
];