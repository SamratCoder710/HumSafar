const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAync = require('../utils/wrapAsync');
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/',isLoggedIn,validateReview,wrapAync(reviews.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAync(reviews.deleteReview));

module.exports = router;