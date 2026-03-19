import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchProducts } from "../../../State/Product/Action";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard"; // ← your existing ProductCard

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const { products, loading, error } = useSelector((store) => store.products);

  // Re-fetch whenever keyword in URL changes
  useEffect(() => {
    if (keyword.trim()) {
      dispatch(searchProducts(keyword));
    }
  }, [keyword]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress sx={{ color: "#4f46e5" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <Typography color="error">Something went wrong. Please try again.</Typography>
      </Box>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="mb-6">
        <Typography variant="h5" fontWeight={700} color="#1f2937">
          Search Results
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-1">
          {products?.length > 0
            ? `${products.length} result${products.length > 1 ? "s" : ""} for "${keyword}"`
            : `No results found for "${keyword}"`}
        </Typography>
      </div>

      {/* ── Products Grid ── */}
      {products?.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={6} sm={4} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // ── Empty State ──
        <Box className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="No results"
            className="w-28 h-28 opacity-40 mb-4"
          />
          <Typography variant="h6" color="text.secondary" fontWeight={600}>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-2 mb-6">
            Try different keywords like "kurta", "watch", "blue shirt"
          </Typography>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </button>
        </Box>
      )}
    </div>
  );
};

export default SearchResultsPage;