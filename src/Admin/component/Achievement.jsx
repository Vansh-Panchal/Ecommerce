import React from 'react'
import { Button, Card, CardContent, styled, Typography, Box } from "@mui/material"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const TrophyImg = styled("img")({
  right: 20,
  bottom: 10,
  height: 115,
  position: "absolute",
  filter: "drop-shadow(0 8px 20px rgba(245,158,11,0.25))",
})

function Achievement() {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: 180,
        background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%)",
        border: "1px solid #fde68a",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(245,158,11,0.12)",
      }}
    >
      {/* Decorative circle */}
      <Box sx={{
        position: "absolute", top: -30, right: 130,
        width: 100, height: 100, borderRadius: "50%",
        background: "rgba(251,191,36,0.12)",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", bottom: -20, left: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(251,191,36,0.08)",
        pointerEvents: "none",
      }} />

      <CardContent sx={{ pr: 20, position: "relative", zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Box sx={{
            width: 28, height: 28, borderRadius: "8px",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 3px 8px rgba(245,158,11,0.35)",
          }}>
            <TrendingUpIcon sx={{ fontSize: 15, color: "white" }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#92400e", fontSize: "0.78rem", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Shop With Me
          </Typography>
        </Box>

        <Typography sx={{ mb: 0.5, color: "#78350f", fontSize: "0.9rem", fontWeight: 500 }}>
          Congratulations 🎉
        </Typography>

        <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 800, color: "#92400e", letterSpacing: "-1px" }}>
          420.8k
        </Typography>

        <Typography sx={{ mb: 2, fontSize: "0.75rem", color: "#b45309" }}>
          Total sales this quarter
        </Typography>

        <Button
          size="small"
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(245,158,11,0.35)",
            fontSize: "0.72rem",
            fontWeight: 700,
            px: 2,
            py: 0.7,
            "&:hover": {
              background: "linear-gradient(135deg, #d97706, #b45309)",
              boxShadow: "0 6px 16px rgba(245,158,11,0.45)",
            },
          }}
        >
          VIEW SALES
        </Button>

        <TrophyImg src="https://img.freepik.com/free-vector/trophy-flat-style_78370-3222.jpg?semt=ais_user_personalization&w=740&q=80" />
      </CardContent>
    </Card>
  )
}

export default Achievement