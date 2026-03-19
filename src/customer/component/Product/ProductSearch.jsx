import React, { useState } from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ProductSearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/products/search?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword(""); // clear after search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: 280,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        px: 1,
        "&:hover": { border: "1px solid #4f46e5" },
        "&:focus-within": { border: "1.5px solid #4f46e5" },
      }}
    >
      <IconButton onClick={handleSearch} sx={{ p: "6px", color: "#6b7280" }}>
        <MagnifyingGlassIcon className="h-4 w-4" />
      </IconButton>

      <InputBase
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{ flex: 1, fontSize: "0.875rem" }}
      />

      {keyword && (
        <IconButton onClick={() => setKeyword("")} sx={{ p: "4px", color: "#9ca3af" }}>
          <XMarkIcon className="h-3.5 w-3.5" />
        </IconButton>
      )}
    </Paper>
  );
};

export default ProductSearch;