import * as React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardContent,CardMedia, Button, Typography } from '@mui/material';
import {useState,useEffect} from 'react';

export default function ShopCard({saleInfo}){
    //console.log(saleInfo);

    const [productData,setProductData] = useState([]);
    const [producerData,setProducerData] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/product/getProductById/${saleInfo.productId}`)
        .then((promise)=>{
            return promise.json()
        })
        .then((res) =>{
            setProductData(res);
        })

        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserByProducerId/${saleInfo.producerId}`)
        .then((promise)=>{
            return promise.json()
        })
        .then((res) =>{
            setProducerData(res);
        })
    },[])

    return(
        <>
            <Card sx={{ width: 300, height: 400 }}>
                <CardMedia 
                    sx={{height:225, margin:"0 0 1rem 0", objectFit:"cover"}}
                    image={saleInfo.imageData}
                    />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {saleInfo.announcementTitle}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {`${producerData.name}`}
                    </Typography>
                </CardContent>
                <CardActions sx={{display:"flex", justifyContent: "space-between", padding:"0 1rem 0 1rem"}}>
                    <Link to={`/marketplace/${saleInfo.id}`} style={{ textDecoration: 'none'}}>
                    <Button variant="contained" size="small">Află mai multe!</Button>
                    </Link> 
                    <Typography variant="h5">
                        {`${saleInfo.price} Lei/Kg`}
                    </Typography>
                </CardActions>
            </Card>
        </>
    )
}