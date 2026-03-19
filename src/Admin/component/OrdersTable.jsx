import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const statusConfig = {
  PLACED:     { bg: "#fef9c3", color: "#854d0e", dot: "#eab308" },
  CONFIRMED:  { bg: "#dbeafe", color: "#1e40af", dot: "#3b82f6" },
  SHIPPED:    { bg: "#ede9fe", color: "#6d28d9", dot: "#8b5cf6" },
  DELIVERED:  { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
  PENDING:    { bg: "#ffedd5", color: "#9a3412", dot: "#f97316" },
};

function OrdersTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => { setAnchorEl(null); setSelectedOrderId(null); };
  const handleClick = (event, orderId) => { setAnchorEl(event.currentTarget); setSelectedOrderId(orderId); };

  const dispatch = useDispatch();
  const { adminOrder } = useSelector(store => store);

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.deleted, adminOrder.delivered]);

  const handleShippedOrder = (orderId) => { dispatch(shipOrder(orderId)); handleClose(); };
  const handleConfirmedOrder = (orderId) => { dispatch(confirmOrder(orderId)); handleClose(); };
  const handleDeliveredOrder = (orderId) => { dispatch(deliveredOrder(orderId)); handleClose(); };
  const handleDeleteOrder = (orderId) => { dispatch(deleteOrder(orderId)); };

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
          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#1e293b" }}>All Orders</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", mt: 0.2 }}>
            {adminOrder?.orders?.length || 0} total orders
          </Typography>
        </Box>
        <Box sx={{
          px: 2, py: 0.6, borderRadius: "8px",
          background: "#eef2ff", fontSize: "0.75rem",
          fontWeight: 600, color: "#6366f1",
        }}>
          Live
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ background: "#fafbff" }}>
              <TableCell sx={headCell}>Image</TableCell>
              <TableCell sx={headCell}>Title</TableCell>
              <TableCell sx={headCell}>Order ID</TableCell>
              <TableCell sx={headCell}>Price</TableCell>
              <TableCell sx={headCell}>Status</TableCell>
              <TableCell sx={headCell}>Update</TableCell>
              <TableCell sx={headCell}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminOrder?.orders?.map((item, index) => {
              const cfg = statusConfig[item.orderStatus] || { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" };
              return (
                <TableRow
                  key={index}
                  sx={{ "&:hover": { background: "#fafbff" }, transition: "background 0.15s" }}
                >
                  <TableCell sx={bodyCell}>
                    <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((oi, i) => (
                        <Avatar
                          key={i}
                          src={oi.product.imageUrl}
                          sx={{
                            width: 34, height: 34,
                            border: "2px solid #eef0f8 !important",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell sx={bodyCell}>
                    {item.orderItems.map((oi, i) => (
                      <Typography key={i} sx={{ fontSize: "0.82rem", color: "#334155", fontWeight: 500 }}>
                        {oi.product.title}
                      </Typography>
                    ))}
                  </TableCell>

                  <TableCell sx={bodyCell}>
                    <Typography sx={{ fontSize: "0.78rem", color: "#6366f1", fontWeight: 600, fontFamily: "monospace" }}>
                      #{item.id}
                    </Typography>
                  </TableCell>

                  <TableCell sx={bodyCell}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b" }}>
                      ₹{item.totalPrice?.toLocaleString()}
                    </Typography>
                  </TableCell>

                  <TableCell sx={bodyCell}>
                    <Box sx={{
                      display: "inline-flex", alignItems: "center", gap: 0.6,
                      px: 1.5, py: 0.4, borderRadius: "20px",
                      background: cfg.bg,
                    }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot }} />
                      <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: cfg.color, textTransform: "capitalize" }}>
                        {item.orderStatus}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={bodyCell}>
                    <Button
                      size="small"
                      onClick={(e) => handleClick(e, item.id)}
                      startIcon={<MoreHorizIcon fontSize="small" />}
                      sx={{
                        borderRadius: "8px",
                        background: "#eef2ff",
                        color: "#6366f1",
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        textTransform: "none",
                        px: 1.5,
                        "&:hover": { background: "#e0e7ff" },
                      }}
                    >
                      Update
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        sx: {
                          borderRadius: "12px",
                          boxShadow: "0 8px 30px rgba(99,102,241,0.15)",
                          border: "1px solid #eef0f8",
                          minWidth: 160,
                        }
                      }}
                    >
                      <MenuItem
                        onClick={() => handleConfirmedOrder(selectedOrderId)}
                        sx={{ fontSize: "0.82rem", gap: 1, color: "#1e40af", "&:hover": { background: "#dbeafe" } }}
                      >
                        <CheckCircleIcon fontSize="small" sx={{ color: "#3b82f6" }} /> Confirmed
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleShippedOrder(selectedOrderId)}
                        sx={{ fontSize: "0.82rem", gap: 1, color: "#6d28d9", "&:hover": { background: "#ede9fe" } }}
                      >
                        <LocalShippingIcon fontSize="small" sx={{ color: "#8b5cf6" }} /> Shipped
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeliveredOrder(selectedOrderId)}
                        sx={{ fontSize: "0.82rem", gap: 1, color: "#166534", "&:hover": { background: "#dcfce7" } }}
                      >
                        <CheckCircleIcon fontSize="small" sx={{ color: "#22c55e" }} /> Delivered
                      </MenuItem>
                    </Menu>
                  </TableCell>

                  <TableCell sx={bodyCell}>
                    <Button
                      size="small"
                      onClick={() => handleDeleteOrder(item.id)}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default OrdersTable;