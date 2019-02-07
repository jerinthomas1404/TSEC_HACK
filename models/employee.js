var mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
    name :{type: String, required:true},
    age: {type: Number, required:true, maxlength: 2},
    image: {type: String, required:true},
    qualification :String,
    experience : Number,
    salary: Number
});
module.exports = mongoose.model("Employee", employeeSchema);