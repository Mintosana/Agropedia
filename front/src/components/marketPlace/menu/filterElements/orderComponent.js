import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function OrderComponent({ orderCriteria, setOrderCriteria }) {
    const handleChange = (event) => {
        setOrderCriteria(event.target.value);
    };

    return (
        <FormControl fullWidth sx={{ margin: '1rem', width: 200 }}>
            <InputLabel>Criteriu</InputLabel>
            <Select
                value={orderCriteria}
                onChange={handleChange}
                label="Order By"
            >
                <MenuItem value="priceAsc">Pret (Crescator)</MenuItem>
                <MenuItem value="priceDesc">Pret (Descrescator)</MenuItem>
                <MenuItem value="alphabetical">Alfabetic</MenuItem>
                <MenuItem value="newest">Recent</MenuItem>
            </Select>
        </FormControl>
    );
}
