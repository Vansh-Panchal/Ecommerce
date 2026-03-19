import React, { useEffect, useState } from "react";
import {
  Avatar, Box, Card, Typography,
  CircularProgress, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TableRow, TablePagination, IconButton,
} from "@mui/material";
import DeleteOutlineIcon  from "@mui/icons-material/DeleteOutline";
import VisibilityIcon     from "@mui/icons-material/Visibility";
import PeopleAltIcon      from "@mui/icons-material/PeopleAlt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCustomer, getCustomers } from "../../State/Admin/Customers/Action";

const ROWS = 10;

// Subtle avatar palette
const AVATAR_COLORS = [
  { bg: "#eef2ff", color: "#6366f1" },
  { bg: "#f0fdf4", color: "#16a34a" },
  { bg: "#fdf4ff", color: "#a855f7" },
  { bg: "#fff8e6", color: "#d97706" },
  { bg: "#fff1f2", color: "#e11d48" },
  { bg: "#f0fdfa", color: "#0d9488" },
];

const CustomerTable = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [page, setPage] = useState(0);

  const { customers, loading } = useSelector((store) => store.customer);

  useEffect(() => { dispatch(getCustomers()); }, [dispatch]);

  const handleDelete      = (id) => dispatch(deleteCustomer(id));
  const handleView        = (id) => navigate(`/admin/customers/${id}`);
  const handleChangePage  = (_, p) => setPage(p);

  const paged = customers.slice(page * ROWS, page * ROWS + ROWS);

  const headCell = {
    fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "0.8px",
    borderBottom: "1px solid #eef0f8", py: 1.5, px: 2,
    whiteSpace: "nowrap", background: "#fafbff",
  };
  const bodyCell = { borderBottom: "1px solid #f8f9fe", py: 1.4, px: 2 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&display=swap');
        .ct-row-hover:hover td { background: #f8f9fe !important; }
      `}</style>

      <Card sx={{
        width: "100%", boxSizing: "border-box",
        borderRadius: "20px", overflow: "hidden",
        border: "1px solid #eef0f8",
        boxShadow: "0 4px 28px rgba(99,102,241,0.07)",
        display: "flex", flexDirection: "column",
      }}>

        {/* ── Header ── */}
        <Box sx={{
          px: 3, pt: 2.5, pb: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #f1f5f9",
          background: "linear-gradient(to right, #fafbff, #fff)",
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{
              width: 38, height: 38, borderRadius: "12px",
              background: "#eef2ff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <PeopleAltIcon sx={{ fontSize: 18, color: "#6366f1" }} />
            </Box>
            <Box>
              <Typography sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700, fontSize: "1rem", color: "#1e293b",
              }}>
                All Customers
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                {customers.length} registered users
              </Typography>
            </Box>
          </Box>

          <Box sx={{
            px: 2, py: 0.5, borderRadius: "20px",
            background: "#f0fdf4",
            display: "flex", alignItems: "center", gap: 0.6,
          }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#16a34a" }}>
              Live
            </Typography>
          </Box>
        </Box>

        {/* ── Table ── */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#6366f1" }} size={32} />
          </Box>
        ) : (
          <TableContainer sx={{ flex: 1, width: "100%", overflowX: "auto" }}>
            <Table sx={{ width: "100%", tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={headCell}>Customer</TableCell>
                  <TableCell sx={headCell}>Email</TableCell>
                  <TableCell sx={headCell}>Mobile</TableCell>
                  <TableCell sx={headCell}>Role</TableCell>
                  <TableCell sx={headCell}>Joined</TableCell>
                  <TableCell sx={{ ...headCell, textAlign: "right" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paged.map((c, idx) => {
                  const pal = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                  return (
                    <TableRow key={c.id} className="ct-row-hover">

                      {/* Customer */}
                      <TableCell sx={bodyCell}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{
                            width: 36, height: 36,
                            bgcolor: pal.bg, color: pal.color,
                            fontSize: "0.9rem", fontWeight: 700,
                            border: `1.5px solid ${pal.color}22`,
                          }}>
                            {c.firstName?.charAt(0)?.toUpperCase() || "?"}
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap" }}>
                              {c.firstName} {c.lastName}
                            </Typography>
                            <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                              #{c.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Email */}
                      <TableCell sx={bodyCell}>
                        <Typography sx={{ fontSize: "0.82rem", color: "#475569", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {c.email || "—"}
                        </Typography>
                      </TableCell>

                      {/* Mobile */}
                      <TableCell sx={bodyCell}>
                        <Typography sx={{ fontSize: "0.82rem", color: "#475569", whiteSpace: "nowrap" }}>
                          {c.mobile || "—"}
                        </Typography>
                      </TableCell>

                      {/* Role */}
                      <TableCell sx={bodyCell}>
                        <Box sx={{
                          display: "inline-flex", alignItems: "center", gap: 0.5,
                          px: 1.2, py: 0.3, borderRadius: "20px",
                          background: c.role === "ROLE_ADMIN" ? "#fef2f2" : "#eef2ff",
                        }}>
                          <Box sx={{
                            width: 5, height: 5, borderRadius: "50%",
                            background: c.role === "ROLE_ADMIN" ? "#ef4444" : "#6366f1",
                          }} />
                          <Typography sx={{
                            fontSize: "0.7rem", fontWeight: 700, whiteSpace: "nowrap",
                            color: c.role === "ROLE_ADMIN" ? "#dc2626" : "#4f46e5",
                          }}>
                            {c.role || "User"}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Joined */}
                      <TableCell sx={bodyCell}>
                        <Typography sx={{ fontSize: "0.8rem", color: "#64748b", whiteSpace: "nowrap" }}>
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric",
                              })
                            : "—"}
                        </Typography>
                      </TableCell>

                      {/* Actions */}
                      <TableCell sx={{ ...bodyCell, textAlign: "right" }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleView(c.id)}
                            sx={{
                              borderRadius: "8px", background: "#eef2ff",
                              color: "#6366f1", width: 30, height: 30,
                              "&:hover": { background: "#e0e7ff" },
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(c.id)}
                            sx={{
                              borderRadius: "8px", background: "#fff1f2",
                              color: "#e11d48", width: 30, height: 30,
                              "&:hover": { background: "#ffe4e6" },
                            }}
                          >
                            <DeleteOutlineIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Box>
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* ── Pagination ── */}
        <Box sx={{ borderTop: "1px solid #f1f5f9", flexShrink: 0 }}>
          <TablePagination
            component="div"
            count={customers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={ROWS}
            rowsPerPageOptions={[ROWS]}
            sx={{
              ".MuiTablePagination-toolbar": { px: 2 },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                fontSize: "0.78rem", color: "#64748b",
              },
              ".MuiTablePagination-actions button": {
                borderRadius: "8px", border: "1px solid #eef0f8",
                mx: 0.3, "&:hover": { background: "#f0f4ff" },
              },
            }}
          />
        </Box>
      </Card>
    </>
  );
};

export default CustomerTable;