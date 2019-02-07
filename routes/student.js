var express = require("express");
var router = express.Router({mergeParams: true});
var Student = require("../models/student");
var middleware = require("../middleware");

// Show Student Details
router.get("/", function(req, res) {
    Student.find({}, function(err, allStudents) {
        if(err) {
            req.flash("error", "Student details could not be loaded!");
            req.redirect("/");
        }
        else {
            res.render("students/index", {students: allStudents});
        }
    });
});

router.get("/:id", function(req, res) {
    Student.findById(req.params.id,function(err, foundStudent) {
        if (err) {
            console.log(err);
        } else {
            res.render("students/show", {student: foundStudent});
        }    
    });
});

module.exports = router;