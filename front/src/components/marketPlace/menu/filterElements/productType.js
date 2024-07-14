import * as React from 'react';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useState, useEffect } from 'react'

export default function ProductType({ selectedProductIds, setSelectedProductIds }) {
    const [vegetables, setVegetables] = useState(["Rosii", "Castraveti", "Varza"]);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/product/getAllProducts`
        ).then((res) => {
            return res.json();
        }).then((productData) => {
            setVegetables(productData.map(element => element.productName));
        })
    }, [])

    const handleChange = (event) => {
        const value = parseInt(event.target.name);
        setSelectedProductIds(prev =>
            prev.includes(value)
                ? prev.filter(id => id !== value)
                : [...prev, value]
        );
    };

    return (
        <FormControl component="fieldset" sx={{ margin: '1rem' }}>
            <FormGroup>
                {vegetables.map((type, index) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedProductIds.includes(index + 1)}
                                onChange={handleChange}
                                name={(index + 1).toString()}
                            />
                        }
                        label={type}
                        key={type}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}