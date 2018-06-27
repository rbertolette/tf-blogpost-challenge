const express = require('express');
const router = express.Router();

// THESE WERE NOT NEEDED
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

// we're going to add some blog posts to BlogPosts
// so there's some data to look at
BlogPosts.create(
  'First Blog Post', 'This is the first blog post', 'Reed');
BlogPosts.create(
  'Second Blog Post', 'This is the second blog post', 'Reed');

// send back JSON representation of all blog posts
// on GET requests to root
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


// // when new blog post is added, ensure has required fields. if not,
// // log error and return 400 status code with hepful message.
// // if okay, add new item, and return it with a status 201.
// router.post('/', (req, res) => {
//   // ensure `name` and `budget` are in request body
//   const requiredFields = ['title', 'content', 'author'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`;
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//   // SOLUTION didn't have date
//   // const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
//   const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
//   res.status(201).json(item);
// });

// add endpoint for POST requests, which should cause a new
// blog post to be added (using `BlogPosts.create()`). It should
// return a JSON object representing the new post (including
// the id, which `BlogPosts` will create. This endpoint should
// send a 400 error if the post doesn't contain
// `title`, `content`, and `author`
router.post('/', (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  let item;
  if (req.body.publishDate){
    item = BlogPosts.create(
      req.body.title, req.body.content, req.body.author, req.body.publishDate);
  } else {
    item = BlogPosts.create(
      req.body.title, req.body.content, req.body.author);
  }
  res.status(201).json(item);
});

// Delete blog posts (by id)!
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post item \`${req.params.id}\``);
  res.status(204).end();
});

// when PUT request comes in with updated blog post, ensure has
// required fields. also ensure that blog post id in url path, and
// blog post id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `BlogPosts.updateItem` with updated blog post.

// SOLUTION DOESN'T NEED JSONPARSER
// router.put('/:id', jsonParser, (req, res) => {
router.put('/:id', (req, res) => {
  // const requiredFields = ['title', 'content', 'author'];
  // SOLUTION ADDS PUBLISHDATE
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    // THIS LINE ADDED FOR SOLUTION
    publishDate: req.body.publishDate

  });
  res.status(204).end();
});

module.exports = router;