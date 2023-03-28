const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: {type: String, required:true},
    //author: String,
    body: {type: String, required:true}
    //story: {type: String, required:false},
    //published: {type: String, date: Date},
    //comments: {type: String, required:false},
    //date: {type: Date, default: Date.now}
   });

   const Post = mongoose.model('Post', postSchema);

   module.exports = Post;