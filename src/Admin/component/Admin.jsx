import React from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Dashboard from './Dashboard';
import CreateProductform from './CreateProductform';
import ProductTable from './ProductTable';
import OrdersTable from './OrdersTable';
import CustomerTable from './CustomerTable';
import AdminDashboard from './Dashboard';
import AdminProfile from './AdminProfile';
import CustomerDetails from './CustomerDetails';

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon fontSize="small" /> },
  { name: "Products", path: "/admin/products", icon: <InventoryIcon fontSize="small" /> },
  { name: "Customers", path: "/admin/customers", icon: <PeopleIcon fontSize="small" /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingBagIcon fontSize="small" /> },
  { name: "Add Product", path: "/admin/products/create", icon: <AddBoxIcon fontSize="small" /> },
];

function Admin() {

  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <Box sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#ffffff",
      borderRight: "1px solid #eef0f8",
    }}>

      {/* Brand */}
      <Box sx={{
        px: 2.5, py: 2.5,
        display: "flex", alignItems: "center", gap: 1.5,
        borderBottom: "1px solid #eef0f8",
      }}>
        <Box sx={{
          width: 38, height: 38, borderRadius: "10px",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
        }}>
          <StorefrontIcon sx={{ color: "white", fontSize: 19 }} />
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.92rem", color: "#1e1b4b", letterSpacing: "-0.3px" }}>
            ShopAdmin
          </Typography>
          <Typography sx={{ fontSize: "0.68rem", color: "#a5b4fc" }}>
            Management Panel
          </Typography>
        </Box>
      </Box>

      {/* Section Label */}
      <Typography sx={{
        px: 2.5,
        pt: 2.5,
        pb: 1,
        fontSize: "0.65rem",
        fontWeight: 700,
        color: "#c7d2fe",
        letterSpacing: "1.2px",
        textTransform: "uppercase"
      }}>
        Navigation
      </Typography>

      {/* Menu */}
      <List sx={{ px: 1.5 }}>
        {menu.map((item) => {

          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: "10px",
                  py: 1,
                  px: 1.5,
                  transition: "all 0.18s ease",
                  background: isActive ? "linear-gradient(135deg, #eef2ff, #ede9fe)" : "transparent",
                  "&:hover": { background: "#f5f3ff" },
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 34,
                  color: isActive ? "#6366f1" : "#94a3b8"
                }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#4f46e5" : "#475569",
                  }}
                />

                {isActive &&
                  <Box sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#6366f1"
                  }} />
                }

              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Account bottom */}
      <Divider sx={{ mx: 2, borderColor: "#eef0f8", mt: "auto", mb: 1.5 }} />

      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          onClick={() => navigate("/admin/profile")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: "10px",
            background: "#f5f3ff",
            cursor: "pointer",
            "&:hover": { background: "#ede9fe" },
            transition: "background 0.18s",
          }}
        >

          <Avatar
            sx={{
              width: 30,
              height: 30,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              fontSize: "0.75rem"
            }}
          >
            A
          </Avatar>

          <Box>
            <Typography sx={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#312e81"
            }}>
              Admin User
            </Typography>

            <Typography sx={{
              fontSize: "0.66rem",
              color: "#a5b4fc"
            }}>
              Administrator
            </Typography>
          </Box>

        </Box>
      </Box>

    </Box>
  );

  return (
    <div className='relative flex h-[100vh]'>

      <CssBaseline />

      <div className='w-[15%] h-full fixed top-0'
        style={{ boxShadow: "4px 0 24px rgba(99,102,241,0.06)" }}>
        {drawer}
      </div>

      <div className='w-[85%] h-[100vh] ml-[15%]'
        style={{ background: "#f8f9fe" }}>

        <Routes>
          <Route path='/' element={<AdminDashboard />} />
          <Route path='/products/create' element={<CreateProductform />} />
          <Route path='/products' element={<ProductTable />} />
          <Route path='/orders' element={<OrdersTable />} />
          <Route path='/customers' element={<CustomerTable />} />
          <Route path='/profile' element={<AdminProfile />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
        </Routes>

      </div>

    </div>
  );
}

export default Admin;