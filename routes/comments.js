var express = require("express");
var router = express.Router({mergeParams: true});
var Fundraiser = require("../models/fundraiser");
var Events = require("../models/event");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Fundraiser.findById(req.params.id, function(err, fundraiser) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {fundraiser: fundraiser});
        }
    });
});

router.get("/new1", middleware.isLoggedIn, function(req, res) {
    Events.findById(req.params.id, function(err, event) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new1", {event : event});
        }
    });
});


router.post("/", function(req, res) {
    Fundraiser.findById(req.params.id, function(err, fundraiser) {
        if(err) {
            console.log(err);
            res.redirect("/fundraisers");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // Add Username to Comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    fundraiser.comments.push(comment);
                    fundraiser.save();
                    req.flash("success", "Comment added successfully!");
                    res.redirect("/fundraisers/" + fundraiser._id)
                }            
            });
        }
    })
});



// Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {fundraiser_id: req.params.id, comment: foundComment});
        }
    });
});

router.get("/:comment_id/edit1", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit1", {event_id: req.params.id, comment: foundComment});
        }
    });
});

// Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment edited successfully!");
            res.redirect("/fundraisers/" + req.params.id);
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment edited successfully!");
            res.redirect("/events/" + req.params.id);
        }
    });
});

// Delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted successfully!");
            res.redirect("/fundraisers/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted successfully!");
            res.redirect("/events/" + req.params.id);
        }
    });
});

module.exports = router;