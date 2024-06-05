const express = require('express');
const router = express.Router();

const reviewController = require('../controllers').reviewController;

router.post('/createReview',reviewController.createReview);
router.get('/getReviewsByUserId/:userId',reviewController.getReviewsByUserId);
router.get('/getReviewsBySaleId/:announcementId',reviewController.getReviewsBySaleId);
router.get('/isReviewGivenByUser/:saleId&:reviewerId',reviewController.isReviewGivenByUser);

module.exports = router;