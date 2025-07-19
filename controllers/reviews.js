const Listing = require("../models/listing");
const Review = require("../models/Review")

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  // if (!listing) throw new ExpressError(404, "Listing not found");
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success","New Review Created!")
  res.redirect(`/listings/${listing._id}`); 
}

module.exports.destroyReview = async (req, res) => {
  const { id, review_id } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
  await Review.findByIdAndDelete(review_id);
  req.flash("success","Review Deleted!")
  res.redirect(`/listings/${id}`);
}