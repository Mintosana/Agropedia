import * as React from 'react';
import {Card, CardActions, CardContent,CardMedia, Button, Typography } from '@mui/material';
export default function ShopCard(){
    return(
        <>
            <Card sx={{ minWidth: 300, minHeight: 400 }}>
                <CardMedia 
                    sx={{height:225, margin:"0 0 1rem 0", objectFit:"cover"}}
                    image="/rosii.jpeg"
                    />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Produs de calitate
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Gradinarul Înțelept
                    </Typography>
                </CardContent>
                <CardActions sx={{display:"flex", justifyContent: "space-between", padding:"0 1rem 0 1rem"}}>
                    <Button variant="contained" size="small">Află mai multe!</Button>
                    <Typography variant="h5">
                        {"300RON"}
                    </Typography>
                </CardActions>
            </Card>
        </>
    )
}