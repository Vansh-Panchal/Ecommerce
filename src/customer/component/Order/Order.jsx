import React from "react";
import { Grid } from "@mui/material";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

function Order() {
  return (
    <div className="px-5 lg:px-20">
      <Grid container spacing={2} >
        {/* LEFT FILTER PANEL */}
        <Grid item xs={3} width={300}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">Order Status</h1>
              {orderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    id={option.value}
                    defaultValue={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-600" htmlFor={option.value}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* RIGHT ORDER LIST */}
        <Grid item xs={9} width={1000}>
          
          <div className="bg-white shadow-md p-4 space-y-5">
            {[1,1,1,1,1,1,1,1].map((item)=><OrderCard />)}
            
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
