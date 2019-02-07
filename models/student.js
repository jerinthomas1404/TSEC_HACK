var mongoose = require("mongoose");

var studentDataSchema = new mongoose.Schema({
    name :{type: String, required:true},
    age: {type: Number, required:true, maxlength: 2},
    image: {type: String, required:true},
    ovr_grade: {type: String, required:true},
    marks: {
        english:Number,
        science:Number,
        mathematics:Number,
        hindi:Number,
        marathi:Number,
        value_edu:Number
    },
    last_updated : {type: Date, default: Date.now},
    tuberculosis :{type: Boolean, default: true},
    asthma :{type: Boolean, default: true},
    epilepsy :{type: Boolean, default: true},
    diabetes :{type: Boolean, default: true},
    hypertension :{type: Boolean, default: true},
    allergies :{type: Boolean, default: true},
    psychosis :{type: Boolean, default: true},
    other :{type:String, default: false},
    description :String
});
module.exports = mongoose.model("Student", studentDataSchema);