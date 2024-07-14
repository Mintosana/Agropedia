import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const PriceFilter = ({ priceRange, setPriceRange }) => {
    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    return (
        <Box sx={{ width: 200, margin: '2rem' }}>
            <Slider
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={30}
                step={0.1}
                marks={[
                    { value: 0, label: '0RON' },
                    { value: 30, label: '30RON' }
                ]}
            />
        </Box>
    );
};

export default PriceFilter;
