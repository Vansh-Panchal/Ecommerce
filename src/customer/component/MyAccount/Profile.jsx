import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProfileLayout from './ProfileLayout'
import PersonalDetails from './PersonalDetails'
import SavedAddress from './SavedAddress'
import MyOrders from './MyOrders'

function Profile() {
  return (
    <Routes>

      <Route element={<ProfileLayout />}>

        <Route path="profile" element={<PersonalDetails />} />
        <Route path="address" element={<SavedAddress />} />
        <Route path="orders" element={<MyOrders />} />

      </Route>

    </Routes>
  )
}

export default Profile