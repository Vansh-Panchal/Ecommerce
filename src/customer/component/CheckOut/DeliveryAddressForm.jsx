import React from 'react'
import { Button, Grid, TextField, Box } from '@mui/material'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch } from 'react-redux'
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';

function DeliveryAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address={
      firstName:data.get("firstName"),
      lastName:data.get("lastName"),
      streetaddress:data.get("address"),
     city:data.get("cityName"),
      state:data.get("state"),
      zipcode:data.get("zip"),
      mobile:data.get("phoneNumber")
    }
    const orderData = {address,navigate}
    dispatch(createOrder(orderData));
    console.log('address',address)
  }
  return (
    <div>

      {/* LEFT SIDE - Address Card */}
      <Grid container spacing={4}>
        <Grid xs={12} lg={5} className='border w-[30rem] rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>
          <div className='p-5 py-7 border-b cursor-pointer'>
            <AddressCard />
            <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }} size='large' variant='contained'>Delivered Here</Button>
          </div>
        </Grid>

        {/* RIGHT SIDE - Delivery Form */}
        <Grid className='w-[50rem]' item xs={12} lg={7}>
          <Box className="border rounded-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* FULL WIDTH TEXTFIELD */}
                <Grid item xs={12} sm={6} className='w-[23rem]'>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} className='w-[22rem]'>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} className='w-[50rem]'>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='w-[23rem]'>
                  <TextField
                    required
                    id="cityName"
                    name="cityName"
                    label="City Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='w-[22rem]'>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State / Province / Region Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='w-[23rem]'>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='w-[22rem]'>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='w-full  h-[3rem]'>
                  <Button  type='submit' className='w-full h-full' sx={{ bgcolor: "RGB(145 85 253)" }} size='large' variant='contained'>Delivered Here</Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default DeliveryAddressForm
