const { reviewDb, producerDb } = require("../models");
const { Op } = require("sequelize");

const reviewController = {
    createReview: async (req, res) => {
        try {
            const review = {
                score: req.body.score,
                message: req.body.message,
                producerId: req.body.producerId,
                announcementId: req.body.announcementId,
                reviewerId: req.body.reviewerId,
            }
            console.log(review)
            if (!review.score || !review.message || !review.producerId || !review.announcementId || !review.reviewerId) {
                res.status(400).send({ message: "Nu au fost primite toate datele legate de review!" })
            }
            if (review.score > 5) {
                res.status(400).send({ message: "Ratingul oferit nu poate fi mai mare de 5 stele!" })
            }
            else {
                await reviewDb.create(review);
                res.status(200).send(review);

            }
        } catch (err) {
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    getReviewsByUserId: async (req, res) => {
        try {
            userId = req.params.userId;
            if (userId) {
                producator = await producerDb.findOne({
                    where: {
                        userId: userId
                    }
                })
                reviewArray = await reviewDb.findAll({
                    where: {
                        producerId: producator.id,
                    }
                })
                const sum = reviewArray.reduce((acc, rating) => acc + rating.score, 0);
                const averageScore = sum / reviewArray.length;
                res.status(200).send({
                    reviews: reviewArray,
                    averageScore,
                })
            }
            else {
                res.status(400).send({ message: "Nu exista un producator cu acest userId!" })
            }
        }
        catch (err) {
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    getReviewsBySaleId: async (req, res) => {
        try {
            saleId = req.params.announcementId;
            if (saleId) {
                const reviews = await reviewDb.findAll({
                    where: {
                        announcementId: saleId,
                    },
                    order:[
                        ['createdAt','DESC']
                    ],
                })
                res.status(200).send(reviews);
            }
            else {
                res.status(404).send({ message: "Nu s-a gasit anuntul cu acest Id!" })
            }
        }
        catch (err) {
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    isReviewGivenByUser: async (req, res) => {
        try {
            const saleId = req.params.saleId;
            const reviewerId = req.params.reviewerId;
            const saleReviews = await reviewDb.findOne({
                where: {
                   [Op.and]: [{announcementId: saleId},{reviewerId:reviewerId}]
                }
            })
            if(saleReviews){
                res.status(401).send({message: "utilizatorul a oferit o recenzie deja!"});
            }
            else {
                res.status(200).send({message:"utilizatorul nu a oferit o recenzie!"});
            }
        }
        catch (err) {
            res.status(500).send({ message: "Eroare de la server!" })
        }
    }
}
module.exports = reviewController;