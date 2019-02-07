var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Feedback = require("../models/feedback")
var Event = require("../models/event")
var Fundraiser = require("../models/fundraiser");
var User = require("../models/user");
var Employee = require("../models/employee");
var Inventory = require("../models/inventory");

router.get("/", function(req, res) {
    Fundraiser.find({}, function(err, allFundraisers) {
        if(err) {
            req.flash("error", "Fundraisers could not be loaded!");
            req.redirect("/");
        }
        else {
            Feedback.find({}, function(err, allFeedbacks) {
                if(err) {
                    req.flash("error", "Fundraisers could not be loaded!");
                    req.redirect("/");
                } else {
                    Event.find({}, function(err, allEvents) {
                    if(err) {
                        req.flash("error", "Fundraisers could not be loaded!");
                        req.redirect("/");
                    } else {
                        Employee.find({}, function(err, allEmployees) {
                        if(err) {
                        req.flash("error", "Fundraisers could not be loaded!");
                        req.redirect("/");
                        } else {
                            Inventory.find({}, function(err, allInventory) {
                            if(err) {
                            req.flash("error", "Fundraisers could not be loaded!");
                            req.redirect("/");
                            } else {
                                res.render("home", {fundraisers: allFundraisers, feedbacks: allFeedbacks, events: allEvents, employees: allEmployees, inventory: allInventory});
                        }
                        
            });
        }
    });        
    }
});
}
});
}
});
});

// Authentication Routes
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to New Hope, " + user.username);
            res.redirect("/");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res) {
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out Successfully!");
    res.redirect("/fundraisers");
});

module.exports = router;