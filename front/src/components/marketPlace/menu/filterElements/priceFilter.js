import * as React from 'react';
import {Slider, Stack, Typography} from "@mui/material";

export default function PriceFilter() {
    return (
        <Stack sx={{margin:"1rem 2rem 1rem 2rem", alignItems:"center" }}>
            <Typography>Preț</Typography>
            <Slider></Slider>
        </Stack>
    )
}