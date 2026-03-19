import React from 'react';
import { Grid, Box, Avatar, Rating } from '@mui/material';

function ProductReviewCard({ reviewData }) {
  // Destructure using the exact keys seen in your console: 'createdAt' and 'review'
  // Note: If rating is missing from the review object, we fallback to 0 or a passed value
  const { review, rating, createdAt, user } = reviewData;

  // Formatting the date safely
  const formattedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "No Date";

  return (
    <div className="py-5">
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar 
              className='text-white' 
              sx={{ width: 56, height: 56, bgcolor: '#9155fd' }}
            >
              {user?.firstName?.[0] || "U"}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className='space-y-2'>
            <div>
              <p className='opacity-70 font-semibold text-lg'>
                {user?.firstName} {user?.lastName}
              </p>
              <p className='text-sm text-gray-400'>
                {formattedDate}
              </p>
            </div>
          </div>
          
          {/* Star rating will now be yellow/gold by default in Material UI */}
          <Rating 
            value={rating || 0} 
            name='half-rating' 
            readOnly 
            precision={0.5} 
            sx={{ mt: 1 }}
          />
          
          <p className='mt-2 text-gray-700'>{review}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductReviewCard;