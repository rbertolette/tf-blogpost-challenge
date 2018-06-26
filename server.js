
const express = require('express');
const morgan = require('morgan');

const app = express();

const router = express.Router();

const blogPostRouter = require('./blogPostsRouter');

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// when requests come into `/blog-posts` or
// `/recipes`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

// app.use('/recipes', recipesRouter);
// const {BlogPosts} = require('./models');
//
// // const bodyParser = require('body-parser');
//
//
// const jsonParser = bodyParser.json();
//
//
// // we're going to add some items to BlogPosts
// // so there's some data to look at
// BlogPosts.create('beans', 2);
// BlogPosts.create('tomatoes', 3);
// BlogPosts.create('peppers', 4);
//
//
// // when the root of this router is called with GET, return
// // all current BlogPosts items
// app.get('/blog-posts', (req, res) => {
//   res.json(BlogPosts.get());
// });
//
// /**
//  * Endpoint for creating a post
//  */
// app.post('/blog-posts', jsonParser, (req, res) => {
//   // ensure required fields are in request body
//   const requiredFields = ['title', 'content', 'author'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//   const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
//   res.status(201).json(item);
// });
//
// /**
//  * Endpoint for updating a post
//  */
// app.put('/blog-posts/:id', jsonParser, (req, res) => {
// // when PUT request comes in with updated item, ensure has
// // required fields. also ensure that item id in url path, and
// // item id in updated item object match. if problems with any
// // of that, log error and send back status code 400. otherwise
// // call `BlogPosts.update` with updated item.
//   const requiredFields = ['title', 'content', 'author', 'publishDate'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//
//   if (req.params.id !== req.body.id) {
//     const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
//     console.error(message);
//     return res.status(400).send(message);
//   }
//   console.log(`Updating blog item \`${req.params.id}\``);
//   BlogPosts.update({
//     id: req.params.id,
//     title: req.body.title,
//     content: req.body.content,
//     author: req.body.author,
//     publishDate: req.body.publishDate
//   });
//   res.status(204).end();
// });
//
// /**
//  * Endpoint for deleting a post
//  */
// app.delete('/blog-posts/:id', (req, res) => {
// // when DELETE request comes in with an id in path,
// // try to delete that item from BlogPosts.
//   BlogPosts.delete(req.params.id);
//   console.log(`Deleted shopping list item \`${req.params.ID}\``);
//   res.status(204).end();
// });
//
//
//
// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });
