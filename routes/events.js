var express = require("express");
var router = express.Router({mergeParams: true});
var Events = require("../models/event");
var middleware = require("../middleware");

// Show Events
router.get("/", function(req, res) {
    Events.find({}, function(err, allEvents) {
        if(err) {
            req.flash("error", "Events could not be loaded!");
            req.redirect("/");
        }
        else {
            res.render("events/index", {events: allEvents});
        }
    });
});

// Post New Event's Info
router.post("/", middleware.isLoggedIn, function(req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var date = req.body.date;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newEvent = {title: title, image: image, date: date, description: desc, author: author};
    Events.create(newEvent, function(err, newDesg) {
        if (err) {
            req.flash("error", "Event could not be added!");
            res.redirect("/events/new");
        } else {
            req.flash("success", "Event added successfully!");
            res.redirect("/events");
        }
    });
});

// Show New Event Form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("events/new");
});

// Show Event Info
router.get("/:id", function(req, res) {
    Events.findById(req.params.id).populate("comments").exec(function(err, foundEvent) {
        if (err) {
            console.log(err);
        } else {
            res.render("events/show", {event: foundEvent});
        }    
    });
});

// Edit
router.get("/:id/edit", middleware.checkEventOwnership, function(req, res) {
    Events.findById(req.params.id, function(err, foundEvent) {
        if(err) {
            req.flash("error", "Event not found!");
            res.redirect("back");
        } else {
            res.render("events/edit", {event: foundEvent});
        }
    });
});

// Update
router.put("/:id", middleware.checkEventOwnership, function(req, res) {
    Events.findByIdAndUpdate(req.params.id, req.body.event, {new: true}, function(err, updatedEvent) {
        if(err) {
            req.flash("error", "Event could not be edited!");
            res.redirect("/events");
        } else {
            req.flash("success", "Event edited successfully!");
            res.redirect("/events/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:id", middleware.checkEventOwnership, function(req, res) {
    Events.findByIdAndRemove(req.params.id, {new: true}, function(err) {
        if(err) {
            req.flash("error", "Event could not be deleted!");
            res.redirect("/events");
        }
        else {
            req.flash("success", "Event deleted successfully!");
            res.redirect("/events");
        }
    });
});

module.exports = router;