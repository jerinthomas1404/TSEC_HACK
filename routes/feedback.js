var express = require("express");
var router = express.Router({mergeParams: true});
var Feedback = require("../models/feedback");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    Feedback.find({}, function(err, allFeedbacks) {
        if(err) {
            req.flash("error", "Feedback could not be loaded!");
            req.redirect("/");
        }
        else {
            res.render("feedback/index", {feedbacks: allFeedbacks});
        }
    });
});
//New feedback
router.post("/", middleware.isLoggedIn, function(req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newFeedback = {title: title, image: image, description: desc, author: author};
    Feedback.create(newFeedback, function(err, newDesg) {
        if (err) {
            req.flash("error", "Feedback could not be added!");
            res.redirect("/feedback/new");
        } else {
            req.flash("success", "Feedback added successfully!");
            res.redirect("/feedback");
        }
    });
});
// Show New Fundraiser Form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("feedback/new");
});
//show info
router.get("/:id", function(req, res) {
    Feedback.findById(req.params.id, function(err, foundFeedback) {
        if (err) {
            console.log(err);
        } else {
            res.render("feedback/show", {feedback: foundFeedback});
        }    
    });
});


// Edit
router.get("/:id/edit", middleware.checkFeedbackOwnership, function(req, res) {
    Feedback.findById(req.params.id, function(err, foundFeedback) {
        if(err) {
            req.flash("error", "Feedback not found!");
            res.redirect("back");
        } else {
            res.render("feedback/edit", {feedback: foundFeedback});
        }
    });
});

// Update
router.put("/:id", middleware.checkFeedbackOwnership, function(req, res) {
    Feedback.findByIdAndUpdate(req.params.id, req.body.feedback, {new: true}, function(err, updatedFeedback) {
        if(err) {
            req.flash("error", "Feedback could not be edited!");
            res.redirect("/feedback");
        } else {
            req.flash("success", "Feedback edited successfully!");
            res.redirect("/feedback/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:id", middleware.checkFeedbackOwnership, function(req, res) {
    Feedback.findByIdAndRemove(req.params.id, {new: true}, function(err) {
        if(err) {
            req.flash("error", "Feedback could not be deleted!");
            res.redirect("/feedback");
        }
        else {
            req.flash("success", "Feedback deleted successfully!");
            res.redirect("/feedback");
        }
    });
});

module.exports = router;