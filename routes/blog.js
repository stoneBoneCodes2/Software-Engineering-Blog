const express = require('express');
const Post = require('../models/post');

const router = express.Router();


router.get('/', function(req, res, next) {
  Post.find({}).then((posts) => {
    res.render('blog-list', {
      posts: posts
    });
  })
  .catch((err) => {
    console.error(err);
    next(new Error("Error: Cannot retieve posts!"));
  })
});


router.get('/update/:id', async function(req, res, next){

  try{
    const post = await Post.findById(req.params.id);
    res.render('blog-update', {
      post: post,
    });
  } catch(err){
    console.error(err);
    next(new Error("Error: Cannot retrieve this post!"));
  }

});

router.post('/update', async function(req, res, next) {
  const post = req.body;
  const filter = { _id: post.id };
  const update = { title: post.title, body: post.body }
  const docs = await Post.findOneAndUpdate(filter, update);
  //console.log(docs);
  //res.send(`Update ${post.title} - ${post.id}`);
  console.log("Found docs to update: ", docs);
  res.redirect(`/blog/update/${post.id}`)
});


router.get('/delete/:id', async function(req, res, next){

  try{
    const post = await Post.findById(req.params.id);
    res.render('blog-delete', {
      post: post,
    });
  } catch(err){
    console.error(err);
    next(new Error("Error: Cannot retrieve this post!"));
  }

});

router.post('/delete', async function(req, res, next) {
  const post = req.body;
  const filter = { _id: post.id };
  //const delete = { title: post.title, body: post.body }
  const docs = await Post.findOneAndRemove(filter);
  console.log("Found docs to delete: ", docs);
  res.redirect('/blog')
});


router.post('/create', function(req, res, next) {

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
