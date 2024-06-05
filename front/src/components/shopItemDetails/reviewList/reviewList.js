import {useState,useEffect} from 'react'
import ReviewEntry from '../reviewEntry/reviewEntry';

import './reviewList.css';

export default function ReviewList({id, reviewList}){

    return(
        <div className="postReviews">
        <h1>Lista Recenzii</h1>
        {reviewList && reviewList.map((review) => <ReviewEntry key={id} reviewData={review}/>)}
        </div>
    )
}