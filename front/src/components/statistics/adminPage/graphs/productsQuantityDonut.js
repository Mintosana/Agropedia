// PieChartComponent.jsx
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(getRandomColor());
    }
    return colors;
};

const PieChartComponent = () => {
    const [productQuantity, setProductQuantity] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/product/getProductQuantityFromSales`)
            .then(res => res.json())
            .then((res) => {
                setProductQuantity(res);
            })
            .catch(err => {
                console.error('Error fetching product quantities:', err);
            });
    }, []);

    if (!productQuantity) {
        return <div>Loading...</div>;
    }

    const colors = generateColors(Object.keys(productQuantity).length);

    const data = {
        labels: Object.keys(productQuantity),
        datasets: [
            {
                label: 'Cantitate',
                data: Object.values(productQuantity),
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.2', '1')),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style ={{width:'300px', height:'300px'}}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChartComponent;
