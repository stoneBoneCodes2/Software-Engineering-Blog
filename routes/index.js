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

module.exports = router;
