import * as React from 'react';
import { Box, Divider, Typography } from "@mui/material";
import PriceFilter from './filterElements/priceFilter';
import ProductType from './filterElements/productType';
import OrderComponent from './filterElements/orderComponent';

export default function FilterMenu({ priceRange, setPriceRange, selectedProductIds, setSelectedProductIds, orderCriteria, setOrderCriteria }) {
    return (
        <Box
            sx={{
                margin: '0 5% 0 0',
                backgroundColor: "white",
                height: '100vh',
                padding: '1rem'
            }}>
            <Typography variant="h6">Pret</Typography>
            <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6">Produs Căutat</Typography>
            <ProductType selectedProductIds={selectedProductIds} setSelectedProductIds={setSelectedProductIds} />
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Ordonează după...</Typography>
            <OrderComponent orderCriteria={orderCriteria} setOrderCriteria={setOrderCriteria} />
        </Box>
    );
}
