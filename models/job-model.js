const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
	name: {type: String, required :true},
    stipend: {type: String},
    time_period : {type: String},
    purpose : {type: String},
    year : {type: Number},
    location : {type: String},
    branch : {type: String},
    appliedusers : [],
    selectedusers : {type: String},
    deadline : {type: Date},
    formlink : {type: String},
    open : {type : Boolean},
    testdate : {type : Date},
    testlink : {type: String},
    eligibletest : {type : String},
});

jobSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Job',jobSchema);