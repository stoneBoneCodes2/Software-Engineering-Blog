var express = require('express');
var router = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}).then((posts) => {
    res.render('index', {
      posts: posts
    });
  })
  .catch((err) => {
    console.error(err);
    next(new Error("Error: Cannot retieve posts!"));
  })
});

//Route to create page
router.get('/create', function(req, res, next) {
  res.render('blog-create');
  
  const post = new Post({
    title: req.body.title,
    body: req.body.content
  });

  post.save()
  .then((doc) => {
    console.log('Post Saved Successfully!', doc);
    res.redirect('/blog');
  }).catch((err) => {
    console.error(err);
    next(new Error("Error saving post!"));
  });

});

//Route to 'View' page...TODO
router.get('/viewOne/:id', async function(req, res, next){

  try{
    const post = await Post.findById(req.params.id);
    res.render('blog-viewOne', {
      post: post,
    });
  } catch(err){
    console.error(err);
    next(new Error("Error: Cannot retrieve this post!"));
  }

});




module.exports = router;
