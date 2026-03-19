import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import Achievement from './Achievement'
import MonthlyOverview from './MonthlyOverview'
import OrdersTable from '../View/OrderView'
import ProductTable from '../View/ProductView'

function AdminDashboard() {
  return (
    <Box
      sx={{
        p: 3.5,
        backgroundColor: "#f8f9fe",
        minHeight: "100vh",
        width: "100%",        // ✅ fill all available horizontal space
        boxSizing: "border-box", // ✅ padding doesn't cause overflow
      }}
    >

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.5px" }}>
          Dashboard
        </Typography>
        <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", mt: 0.3 }}>
          Welcome back, Admin 👋 Here's what's happening today.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>

        {/* Top Section */}
        <Grid item xs={12} md={4}>
          <Achievement />
        </Grid>

        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>

        {/* Bottom Section */}
        <Grid item xs={12}>
          <OrdersTable />
        </Grid>

        <Grid item xs={12}>
          <ProductTable />
        </Grid>

      </Grid>
    </Box>
  )
}

export default AdminDashboard