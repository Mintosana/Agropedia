import * as React from 'react'
import {Box} from "@mui/material"
import ShopCard from "./shopCard";

export default function ShopItems() {
    return (
        <>
        <Box 
        sx={{
            display: "flex",
            flexWrap: 'wrap',
            gap: '1rem',
            margin:'2rem 1rem 0 0' 
            }}>
        <ShopCard />
        <ShopCard />
        {/* <ShopCard />
        <ShopCard /> */}
        </Box> 
        </>
    )
}