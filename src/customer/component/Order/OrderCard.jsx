import React from "react";
import { Grid } from "@mui/material";
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";

function OrderCard() {
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate("/account/order/2")} className="p-5 shadow-md hover:shadow-2xl ">
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={6}>
                    <div className="flex cursor-pointer">
                        <img
                            className="h-[5rem] w-[5rem] object-cover rounded"
                            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTm4dqPK2HkT590Uo_Pcv7wHLy7GRBGgC_YuIHvMUXuRXF_PwZ4YMDZp1DfjFHiG9yOmsWuwYQIZ-QixuEpiJYLw8ffrdXazArSXTnTa7H9UNGUyKnCPllf"
                            alt=""
                        />
                        <div className="ml-5 space-y-2">
                            <p className="font-medium">SATAZ Women's Satin Silk Saree</p>
                            <p className="opacity-50 text-sm font-semibold">Size: M</p>
                            <p className="opacity-50 text-sm font-semibold">Color: Rose Gold</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <p>Rs 10000</p>
                </Grid>
                <Grid item xs={4}>
                    {true && <div>
                        <p>
                            <AdjustIcon sx={{ width: '15px', height: '15px' }} className="text-green-600 mr-2 text-sm" />
                            <span>Delivered on March 3</span>
                        </p>

                        <p className="text-sm">
                            Your item has been delivered
                        </p>
                    </div>}

                    {false && <p>
                        <span>Expected on March 3</span>
                    </p>}
                </Grid>
            </Grid>
        </div>

    );
}

export default OrderCard;
