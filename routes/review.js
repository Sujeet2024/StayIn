const express = require("express");
const router = express.Router({ mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/Review");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")

//post review route

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


router.delete("/:review_id", isLoggedIn, isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;
