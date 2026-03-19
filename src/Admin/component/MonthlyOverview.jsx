import React from 'react'
import { TrendingUp } from '@mui/icons-material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import CurrencyUsdIcon from '@mui/icons-material/AttachMoney';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { CardContent, Chip } from '@mui/material';

const salesData = [
  {
    stats: '245K',
    title: 'Sales',
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    bg: "#eef2ff",
    iconColor: "#6366f1",
    icon: <TrendingUp sx={{ fontSize: "1.3rem" }} />,
    change: "+12%",
  },
  {
    stats: '12.5K',
    title: 'Customers',
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    bg: "#ecfdf5",
    iconColor: "#10b981",
    icon: <AccountBoxIcon sx={{ fontSize: "1.3rem" }} />,
    change: "+8%",
  },
  {
    stats: '1.54K',
    title: 'Products',
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    bg: "#fffbeb",
    iconColor: "#f59e0b",
    icon: <SettingsCellIcon sx={{ fontSize: "1.3rem" }} />,
    change: "+5%",
  },
  {
    stats: '$88K',
    title: 'Revenue',
    gradient: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    bg: "#f0f9ff",
    iconColor: "#0ea5e9",
    icon: <CurrencyUsdIcon sx={{ fontSize: "1.3rem" }} />,
    change: "+19%",
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 2,
        p: 2, borderRadius: "14px",
        background: item.bg,
        border: `1px solid ${item.iconColor}18`,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 8px 20px ${item.iconColor}18`,
        },
      }}>
        <Avatar
          variant="rounded"
          sx={{
            width: 46, height: 46,
            background: item.gradient,
            borderRadius: "12px",
            boxShadow: `0 4px 12px ${item.iconColor}30`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 500 }}>
            {item.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b", lineHeight: 1.2 }}>
              {item.stats}
            </Typography>
            <Chip
              label={item.change}
              size="small"
              sx={{
                height: 18, fontSize: "0.62rem", fontWeight: 700,
                background: `${item.iconColor}18`,
                color: item.iconColor,
                "& .MuiChip-label": { px: 0.8 }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  ));
};

export default function MonthlyOverview() {
  return (
    <Card sx={{
      borderRadius: "16px",
      border: "1px solid #eef0f8",
      boxShadow: "0 4px 24px rgba(99,102,241,0.07)",
      background: "#ffffff",
    }}>
      <CardHeader
        title={
          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#1e293b" }}>
            Monthly Overview
          </Typography>
        }
        action={
          <IconButton size='small' sx={{ color: "#94a3b8", "&:hover": { background: "#f1f5f9" } }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        }
        subheader={
          <Typography variant="body2" sx={{ mt: 0.5, color: "#64748b", fontSize: "0.8rem" }}>
            <Box component="span" sx={{ fontWeight: 700, color: "#10b981" }}>↑ 48.5% Growth</Box>
            {' '}this month
          </Typography>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}