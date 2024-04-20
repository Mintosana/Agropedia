import * as React from 'react';
import { Autocomplete,Slider, Stack, Typography, TextField } from "@mui/material";

export default function ProductType() {
    const vegetables = ["Rosii","Castraveti","Varza","Morcovi"]
    return (
        //Nu e bine asa
        <Autocomplete
            disablePortal
            id="products"
            options={vegetables}
            size="small"
            sx={{ width: 150, height: 75, margin: "1rem" }}
            renderInput={(params) => <TextField {...params} label="Legume" />}
        />
    )
}