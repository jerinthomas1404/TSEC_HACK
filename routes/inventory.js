var express = require("express");
var router = express.Router({mergeParams: true});
var Inventory = require("../models/inventory");
var middleware = require("../middleware");

// Show Student Details
router.get("/", function(req, res) {
    Inventory.find({}, function(err, allInventory) {
        if(err) {
            req.flash("error", "Inventory details could not be loaded!");
            req.redirect("/");
        }
        else {
            res.render("inventory/index", {inventory: allInventory});
        }
    });
});

// Post New student Info
router.post("/", middleware.isLoggedIn, function(req, res) {
    var title = req.body.title;
    var quantity = req.body.quantity;
    var newInventory = {title:title, quantity: quantity};
    Inventory.create(newInventory, function(err, newDesg) {
        if (err) {
            req.flash("error", "student could not be added!");
            res.redirect("/inventory/new");
        } else {    
            req.flash("success", "Inventory added successfully!");
            res.redirect("/inventory");
        }
    });
});

// Show New student Form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("inventory/new");
});

router.get("/:id", function(req, res) {
    Inventory.findById(req.params.id,function(err, foundInventory) {
        if (err) {
            console.log(err);
        } else {
            res.render("inventory/show", {inventory: foundInventory});
        }    
    });
});

// Edit
router.get("/:id/edit", middleware.checkInventoryOwnership, function(req, res) {
    Inventory.findById(req.params.id, function(err, foundInventory) {
        if(err) {
            req.flash("error", "Inventory not found!");
            res.redirect("back");
        } else {
            res.render("inventory/edit", {inventory: foundInventory});
        }
    });
});

// Update
router.put("/:id", middleware.checkInventoryOwnership, function(req, res) {
    Inventory.findByIdAndUpdate(req.params.id, req.body.title, {new: true}, function(err, updatedInventory) {
        if(err) {
            req.flash("error", "student could not be edited!");
            res.redirect("/inventory");
        } else {
            req.flash("success", "Inventory edited successfully!");
            res.redirect("/inventory/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:id", middleware.checkInventoryOwnership, function(req, res) {
    Inventory.findByIdAndRemove(req.params.id, {new: true}, function(err) {
        if(err) {
            req.flash("error", "student could not be deleted!");
            res.redirect("/inventory");
        }
        else {
            req.flash("success", "inventory deleted successfully!");
            res.redirect("/inventory");
        }
    });
});

module.exports = router;