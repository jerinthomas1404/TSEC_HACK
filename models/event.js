var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    date: Date,
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

module.exports = mongoose.model("Event", eventSchema);