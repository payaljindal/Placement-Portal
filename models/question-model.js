const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    question : {type: String , required: true},
    answer : {type: String , required : true},
    about : {type: String, required : true},
    marks : {type: Number , required  : true},
    option1 : {type: String , required : true},
    option2 : {type : String , required : true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Question',userSchema);