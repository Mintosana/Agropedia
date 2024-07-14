import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Header from "../components/header/header";
import ShopItems from "../components/marketPlace/shopItems/shopItems";
import FilterMenu from "../components/marketPlace/menu/filterMenu";
import TicketButton from "../components/ticketButton/ticketButton";
import './css/marketplace.css';

export default function Marketplace() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 30]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [orderCriteria, setOrderCriteria] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/getAllSales`)
            .then((promise) => promise.json())
            .then((res) => {
                console.log(res);
                setData(res);
                setFilteredData(res);
            });
    }, []);

    useEffect(() => {
        filterAndOrderData();
    }, [priceRange, selectedProductIds, orderCriteria, data]);

    const filterAndOrderData = () => {
        let filtered = data;

        if (priceRange) {
            filtered = filtered.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
        }

        if (selectedProductIds.length > 0) {
            filtered = filtered.filter(item => selectedProductIds.includes(item.productId));
        }

        switch (orderCriteria) {
            case 'priceAsc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'alphabetical':
                filtered.sort((a, b) => a.announcementTitle.localeCompare(b.announcementTitle));
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        setFilteredData(filtered);
    };

    return (
        <>
            <Header />
            <Box className="MarketplaceElementsContainer">
                <FilterMenu 
                    data={data} 
                    setData={setData} 
                    priceRange={priceRange} 
                    setPriceRange={setPriceRange}
                    selectedProductIds={selectedProductIds}
                    setSelectedProductIds={setSelectedProductIds}
                    orderCriteria={orderCriteria}
                    setOrderCriteria={setOrderCriteria}
                />
                <ShopItems data={filteredData} />
            </Box>
            <TicketButton />
        </>
    );
}
