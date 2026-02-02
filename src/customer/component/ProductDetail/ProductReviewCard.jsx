import React from 'react'
import {Grid , Box , Avatar, Rating} from '@mui/material'
function ProductReviewCard() {
  return (
    <div>
        <Grid container spacing={2} gap={3}>
            <Grid item xs={1}>
                <Box>
                    <Avatar className='text-white ' sx={{width:56,height:56,bgcolor:'#9155fd'}}></Avatar>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <div className='space-y-2'>
                    <div>
                        <p className='opcaity-70 font-semibold text-lg'>Raam</p>
                        <p>April 5, 2025</p>
                    </div>
                </div>
                <Rating value={4.5} name='half-rating' readOnly precision={0.5}/>
                <p >Nice , I love this shirt</p>
            </Grid>
        </Grid>
    </div>
  )
}

export default ProductReviewCard