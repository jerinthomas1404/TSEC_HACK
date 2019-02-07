var mongoose = require("mongoose");

var feedbackSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Feedback", feedbackSchema);