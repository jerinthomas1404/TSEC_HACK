var express = require("express");
var router = express.Router({mergeParams: true});
var Fundraiser = require("../models/fundraiser");
var middleware = require("../middleware");
var paymentFundraiser;

// Show Fundraisers
router.get("/", function(req, res) {
    Fundraiser.find({}, function(err, allFundraisers) {
        if(err) {
            req.flash("error", "Fundraisers could not be loaded!");
            req.redirect("/");
        }
        else {
            res.render("fundraisers/index", {fundraisers: allFundraisers});
        }
    });
});

// Post New Fundraiser Info
router.post("/", middleware.isLoggedIn, function(req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var goal = req.body.goal;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newFundraiser = {title: title, image: image, goal: goal, description: desc, author: author};
    // var newFundraiser = global.newFundraiser;
    Fundraiser.create(newFundraiser, function(err, newDesg) {
        if (err) {
            req.flash("error", "Fundraiser could not be added!");
            res.redirect("/fundraisers/new");
        } else {
            req.flash("success", "Fundraiser added successfully!");
            res.redirect("/fundraisers");
        }
    });
});

// Show New Fundraiser Form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("fundraisers/new");
});

// Show Fundraiser Info
router.get("/:id", function(req, res) {
    Fundraiser.findById(req.params.id).populate("comments").exec(function(err, foundFundraiser) {
        if (err) {
            console.log(err);
        } else {
            paymentFundraiser = foundFundraiser;
            res.render("fundraisers/show", {fundraiser: foundFundraiser});
        }    
    });
});

// Edit
router.get("/:id/edit", middleware.checkFundraiserOwnership, function(req, res) {
    Fundraiser.findById(req.params.id, function(err, foundFundraiser) {
        if(err) {
            req.flash("error", "Fundraiser not found!");
            res.redirect("back");
        } else {
            res.render("fundraisers/edit", {fundraiser: foundFundraiser});
        }
    });
});

// Update
router.put("/:id", middleware.checkFundraiserOwnership, function(req, res) {
    Fundraiser.findByIdAndUpdate(req.params.id, req.body.fundraiser, {new: true}, function(err, updatedFundraiser) {
        if(err) {
            req.flash("error", "Fundraiser could not be edited!");
            res.redirect("/fundraisers");
        } else {
            req.flash("success", "Fundraiser edited successfully!");
            res.redirect("/fundraisers/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:id", middleware.checkFundraiserOwnership, function(req, res) {
    Fundraiser.findByIdAndRemove(req.params.id, {new: true}, function(err) {
        if(err) {
            req.flash("error", "Fundraiser could not be deleted!");
            res.redirect("/fundraisers");
        }
        else {
            req.flash("success", "Fundraiser deleted successfully!");
            res.redirect("/fundraisers");
        }
    });
});

module.exports = router;
exports.paymentFundraiser = paymentFundraiser;