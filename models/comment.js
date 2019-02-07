var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);