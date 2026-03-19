import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CategoryIcon from '@mui/icons-material/Category';

function ProductTable() {
  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(findProducts({
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: page,
      pageSize: rowsPerPage,
      stock: ""
    }));
  }, [products.deletedProduct, page]);

  const headCell = {
    fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "0.8px",
    borderBottom: "1px solid #eef0f8", py: 1.5, px: 2,
  };

  const bodyCell = {
    borderBottom: "1px solid #f8f9fe", py: 1.5, px: 2,
  };

  return (
    <Card sx={{
      borderRadius: "16px",
      border: "1px solid #eef0f8",
      boxShadow: "0 4px 24px rgba(99,102,241,0.07)",
      overflow: "hidden",
    }}>
      <Box sx={{ px: 3, pt: 2.5, pb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#1e293b" }}>All Products</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", mt: 0.2 }}>
            {products?.products?.totalElements || 0} products listed
          </Typography>
        </Box>
        <Box sx={{
          px: 2, py: 0.6, borderRadius: "8px",
          background: "#ecfdf5", fontSize: "0.75rem",
          fontWeight: 600, color: "#10b981",
        }}>
          Active
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ background: "#fafbff" }}>
              <TableCell sx={headCell}>Image</TableCell>
              <TableCell sx={headCell}>Title</TableCell>
              <TableCell sx={headCell}>Category</TableCell>
              <TableCell sx={headCell}>Price</TableCell>
              <TableCell sx={headCell}>Quantity</TableCell>
              <TableCell sx={headCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.products?.content?.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:hover": { background: "#fafbff" }, transition: "background 0.15s" }}
              >
                <TableCell sx={bodyCell}>
                  <Avatar
                    src={item.imageUrl}
                    variant="rounded"
                    sx={{
                      width: 40, height: 40,
                      borderRadius: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      border: "1px solid #eef0f8",
                    }}
                  />
                </TableCell>

                <TableCell sx={bodyCell}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e293b" }}>
                    {item.title}
                  </Typography>
                </TableCell>

                <TableCell sx={bodyCell}>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center", gap: 0.5,
                    px: 1.2, py: 0.3, borderRadius: "6px",
                    background: "#f0fdf4",
                  }}>
                    <CategoryIcon sx={{ fontSize: 11, color: "#10b981" }} />
                    <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#059669" }}>
                      {item.category.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell sx={bodyCell}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b" }}>
                    ₹{item.price?.toLocaleString()}
                  </Typography>
                </TableCell>

                <TableCell sx={bodyCell}>
                  <Box sx={{
                    display: "inline-flex",
                    px: 1.2, py: 0.3, borderRadius: "6px",
                    background: item.quantity > 10 ? "#f0fdf4" : "#fef2f2",
                  }}>
                    <Typography sx={{
                      fontSize: "0.78rem", fontWeight: 700,
                      color: item.quantity > 10 ? "#16a34a" : "#ef4444",
                    }}>
                      {item.quantity}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell sx={bodyCell}>
                  <Button
                    size="small"
                    onClick={() => handleProductDelete(item.id)}
                    startIcon={<DeleteOutlineIcon fontSize="small" />}
                    sx={{
                      borderRadius: "8px",
                      border: "1px solid #fee2e2",
                      color: "#ef4444",
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      textTransform: "none",
                      px: 1.5,
                      "&:hover": { background: "#fef2f2", borderColor: "#fca5a5" },
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ borderTop: "1px solid #eef0f8" }}>
        <TablePagination
          component="div"
          count={products?.products?.totalElements || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
          sx={{
            ".MuiTablePagination-toolbar": { px: 2 },
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
              fontSize: "0.78rem", color: "#64748b",
            },
            ".MuiTablePagination-actions button": {
              borderRadius: "8px",
              border: "1px solid #eef0f8",
              mx: 0.3,
              "&:hover": { background: "#f0f4ff" },
            },
          }}
        />
      </Box>
    </Card>
  );
}

export default ProductTable;