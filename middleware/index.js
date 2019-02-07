var Fundraiser = require("../models/fundraiser");
var Feedback = require("../models/feedback");
var Event = require("../models/event");
var Student = require("../models/student");
var Comment = require("../models/comment");
var Inventory = require("../models/inventory");
var middlewareObj = {};

middlewareObj.checkFundraiserOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Fundraiser.findById(req.params.id, function(err, foundFundraiser) {
            if(err) {
                req.flash("error", "Fundraiser not found!");
                res.redirect("back");
            } else if(foundFundraiser.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkEventOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Event.findById(req.params.id, function(err, foundEvent) {
            if(err) {
                req.flash("error", "Fundraiser not found!");
                res.redirect("back");
            } else if(foundEvent.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkFeedbackOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Feedback.findById(req.params.id, function(err, foundFeedback) {
            if(err) {
                req.flash("error", "Fundraiser not found!");
                res.redirect("back");
            } else if(foundFeedback.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkStudentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Student.findById(req.params.id, function(err, foundStudent) {
            if(err) {
                req.flash("error", "Fundraiser not found!");
                res.redirect("back");
            } else if(foundStudent.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkInventoryOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Inventory.findById(req.params.id, function(err, foundInventory) {
            if(err) {
                req.flash("error", "Fundraiser not found!");
                res.redirect("back");
            } else if(foundInventory.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } else if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "User must be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;