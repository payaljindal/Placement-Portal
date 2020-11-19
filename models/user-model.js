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
  marital: {type : String , required : true},
  languages : {type : String , required : true},
  admin : { type : Number},
  location : {type: String , required : true},
  linkedin : {type: String},
  github : {type : String},
  experience : {type: Number},
  skills : [],
  education : [],
  work : [],
  min_salary : {type: Number },
  job_type : {type: String},
  job_category : {type: String },
  messages : [],
  age : {type: Number},
  studying : {type: String},
  score : {type : Number},
  git_score : {type: Number},
  tot_score : {type: Number}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);