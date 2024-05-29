
import Maps from '../components/maps/maps';
import Headers from "../components/header/header"
import Profile from '../components/shopItemDetails/profile';
import Review from '../components/shopItemDetails/review';
import ItemDescription from '../components/shopItemDetails/itemDescription';

import './css/shopItemDetails.css';
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function ShopItemDetails() {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/getSaleById/${id}`)
            .then((promise) => {
                return promise.json()
            })
            .then((response) => {
                setItemData(response);
            })
    }, [])

    useEffect(() => {
        if (itemData) {
            setAvailableQuantity(itemData.totalQuantity);
            console.log(itemData)
        }
    }, [itemData]);


    return (
        <>
            <Headers></Headers>
            {itemData && (
                <>
                    <ItemDescription itemData={itemData} availableQuantity={availableQuantity} id={id}></ItemDescription>
                    <Profile producerId = {itemData.producerId}></Profile>
                    <Review></Review>
                    
                    {/* <div className='locationComponent'>
                        <Maps></Maps>
                    </div> */}
                </>
            )}
        </>
    )
}