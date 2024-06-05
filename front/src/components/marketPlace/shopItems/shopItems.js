import * as React from 'react'
import {Box} from "@mui/material"
import ShopCard from "./shopCard";
import {useEffect,useState} from 'react';

export default function ShopItems() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/getAllSales`)
        .then((promise)=>{
            return promise.json()
        })
        .then((res) =>{
            console.log(res);
            setData(res);
        })
    },[])
    

    return (
        <>
        <Box 
        sx={{
            display: "flex",
            flexWrap: 'wrap',
            gap: '1rem',
            margin:'2rem 1rem 0 0'
            }}>
                {data.map(saleInfo => <ShopCard key={saleInfo.id} saleInfo={saleInfo}></ShopCard>)}
        </Box> 
        </>
    )
}