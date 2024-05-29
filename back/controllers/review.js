const { reviewDb,producerDb } = require("../models");

const reviewController = {
    getReviewsByUserId: async (req,res) => {
        try{
            userId = req.params.userId;
            if(userId){
               producator = await producerDb.findOne({
                    where:{
                        userId : userId
                    }
                })
                reviewArray = await reviewDb.findAll({
                    where: {
                        producerId: producator.id,
                    }
                })
                const sum = reviewArray.reduce((acc,rating) => acc + rating.score,0);
                const averageScore = sum / reviewArray.length;
                res.status(200).send({
                    reviews: reviewArray,
                    averageScore,
                })
            }
            else{
                res.status(400).send({message: "Nu exista un producator cu acest userId!"})
            }
        }
        catch(err){
            res.status(500).send({message: "Eroare de la server!"})
        } 
    },

    createReview: async(req,res) => {
        try{
            const review = {
                score:req.body.score,
                message:req.body.message,
                producerId:req.body.producerId,
                announcementId: req.body.announcementId,
                reviewerId: req.body.reviewerId,
            }
            console.log(review)
            if(!review.score || !review.message || !review.producerId || !review.announcementId || !review.reviewerId){
                res.status(400).send({message: "Nu au fost primite toate datele legate de review!"})
            }
            if(review.score > 5){
                res.status(400).send({message: "Ratingul oferit nu poate fi mai mare de 5 stele!"})
            }
            else{
                await reviewDb.create(review);
                res.status(200).send(review);

            }
        }catch(err){
            res.status(500).send({message: "Eroare de la server!"})
        }
    }
}
module.exports = reviewController;