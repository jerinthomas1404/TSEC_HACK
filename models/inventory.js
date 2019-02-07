var mongoose = require("mongoose");

var inventorySchema = new mongoose.Schema({
    title: String,
    quantity: Number,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Inventory", inventorySchema);