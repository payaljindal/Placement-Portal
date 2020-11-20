const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {type: String, required :true},
	email : { type : String, required : true, unique: true},
	password : { type : String, required: true , minlength: 6},
  username : {  type : String, required : true },
  contact : {type : Number,required : true},
  gender : {type : String , required : true},
  bio : {type: String},
  admin : { type : Number},
  location : {type: String },
  linkedin : {type: String},
  github : {type : String},
  experience : {type: Number},
  skills : [],
  education : [],
  work : [],
  job_type : {type: String},
  job_category : {type: String },
  messages : [],
  cgpa : {type : Number}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);