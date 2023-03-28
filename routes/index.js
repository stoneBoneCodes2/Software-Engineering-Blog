var express = require('express');
var router = express.Router();
const Post = require('../models/post');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'S.E. Blog' });
// });

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
    // res.render('blog-create', {
    //   blog_title: req.body.title, 
    //   blog_content: req.body.content
    // });
  }).catch((err) => {
    console.error(err);
    next(new Error("Error saving post!"));
  });

});




module.exports = router;
