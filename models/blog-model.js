const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
   by : {type: String , required: true},
   title: {type: String , required : true},
   topic : {type: String, required : true},
    content: {type: String , required  : true},
    date: { type: String, default: Date } 
});

module.exports = mongoose.model('Blog',blogSchema);