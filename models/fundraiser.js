var mongoose = require("mongoose");

var fundraiserSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    amount: Number,
    goal: Number,
    author: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ],
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Fundraiser", fundraiserSchema);