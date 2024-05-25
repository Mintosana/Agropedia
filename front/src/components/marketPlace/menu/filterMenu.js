import * as React from 'react';
import {Box} from "@mui/material";
import PriceFilter from './filterElements/priceFilter';
import ProductType from './filterElements/productType';

export default function FilterMenu(){
    return(
        <Box
        sx={{
             minWidth: '20%',
             margin: '0 10% 0 0',
             backgroundColor: "white",
             height:'100vh',
             }}>
        <PriceFilter />
        <ProductType />
        </Box>
    )
}