import { Button, Rating, TextField } from '@mui/material';
import { useState,useEffect } from 'react'
import './review.css';


export default function Review({ id, producerId,setReviewList }) {
    const [reviewValue, setReviewValue] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [hasReviewed,setHasReviewed] = useState(true);
    


    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/review/isReviewGivenByUser/${id}&${localStorage.getItem("userId")}`)
        .then(res=>{
            if(res.status == 200){
                setHasReviewed(true);
            }
            else if (res.status == 401){
                setHasReviewed(false);
            }

            if(localStorage.getItem('userId') == producerId){
                setHasReviewed(false);
            }
        })
    },[])

    const handleRatingChange = (event, newValue) => {
        setReviewValue(newValue);
    };

    const handleClick = () => {
        const data = {
            score: reviewValue,
            message: reviewText,
            producerId: producerId,
            announcementId: id,
            reviewerId: localStorage.getItem("userId"),
        }
        if (!data.score) {
            alert("Nu ai oferit un rating recenziei tale!");
        }
        else if (data.message == '') {
            alert("Nu ai adaugat un mesaj recenziei tale!");
        }
        else if (data.message.length >= 255){
            alert("Textul este prea lung! Va rugam reformulati mesajul...");
        }
        else {
            console.log(data);
            fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/review/createReview`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then(
                setReviewList((prevArray) => [
                    ...prevArray,
                    data
                ]));
                setHasReviewed(false);
                setReviewText("");
        }
    }

    const handleReviewText = (event) => {
        setReviewText(event.target.value);
    }

    return (
        <div className="reviewSection">
            <TextField multiline rows={4} label="Lasa o recenzie acestui anunț!" value={reviewText} onChange={handleReviewText} sx={{ width: 600, marginBottom: 2 }}></TextField>
            <div className="reviewRateSection">
                <Button
                    variant="contained"
                    onClick={handleClick}
                    disabled={!hasReviewed}
                >Ofera recenzie!</Button>
                <Rating
                    name='reviewRating'
                    size="large"
                    precision={1}
                    value={reviewValue}
                    onChange={handleRatingChange}
                />
            </div>
        </div>
    );
}