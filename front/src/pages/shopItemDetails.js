import Headers from "../components/header/header"
import Profile from '../components/shopItemDetails/profile/profile';
import Review from '../components/shopItemDetails/review/review';
import ItemDescription from '../components/shopItemDetails/itemDescription/itemDescription';
import ReviewList from '../components/shopItemDetails/reviewList/reviewList';
import MapComponent from "../components/maps/maps";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


import './css/shopItemDetails.css';
import "leaflet/dist/leaflet.css";


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

    //AICI AM LUCRU
    const [reviewList,setReviewList] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/review/getReviewsBySaleId/${id}`)
            .then((promise) => {
                return promise.json()
            })
            .then((response) => {
                setReviewList(response);
                console.log(response);
            })
    },[])

    useEffect(() => {
        if (itemData) {
            setAvailableQuantity(itemData.totalQuantity);
        }
    }, [itemData]);


    return (
        <>
            <Headers></Headers>
            {itemData && (
                <>
                    <div className='orderComponent'>
                        <ItemDescription itemData={itemData} availableQuantity={availableQuantity} id={id}></ItemDescription>
                        <Profile producerId={itemData.producerId}></Profile>
                        
                    </div>
                    {/* <MapComponent></MapComponent> */}
                    <Review id={id} setReviewList={setReviewList} producerId={itemData.producerId}></Review>
                    <ReviewList id={id} reviewList={reviewList}></ReviewList>
                </>
            )}
        </>
    )
}