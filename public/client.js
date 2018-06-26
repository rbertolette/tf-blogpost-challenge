
const blogPostTemplate = (
  '<li class="js-blog-item">' +
  '<p><span class="blog-item js-blog-item-title"></span></p>' +
  '<div class="blog-item-controls">' +
  '<button class="js-blog-item-toggle">' +
  '<span class="button-label">check</span>' +
  '</button>' +
  '<button class="js-blog-item-delete">' +
  '<span class="button-label">delete</span>' +
  '</button>' +
  '</div>' +
  '</li>'
);

// var recipeTemplate = (
//   '<div class="recipe js-recipe">' +
//   '<h3 class="js-recipe-name"><h3>' +
//   '<hr>' +
//   '<ul class="js-recipe-ingredients">' +
//   '</ul>' +
//   '<div class="recipe-controls">' +
//   '<button class="js-recipe-delete">' +
//   '<span class="button-label">delete</span>' +
//   '</button>' +
//   '</div>' +
//   '</div>'
// );


const BLOG_POSTS_URL = '/blog-posts';


// function getAndDisplayRecipes() {
//   console.log('Retrieving recipes')
//   $.getJSON(RECIPES_URL, function(recipes) {
//     console.log('Rendering recipes');
//     var recipesElement = recipes.map(function(recipe) {
//       var element = $(recipeTemplate);
//       element.attr('id', recipe.id);
//       element.find('.js-recipe-name').text(recipe.name);
//       recipe.ingredients.forEach(function(ingredient) {
//         element.find('.js-recipe-ingredients').append(
//           '<li>' + ingredient + '</li>');
//       });
//       return element;
//     });
//     $('.js-recipes').html(recipesElement)
//   });
// }

function getAndDisplayBlogPosts() {
  console.log('Retrieving blog posts');
  $.getJSON(BLOG_POSTS_URL, function(items) {
    console.log('Rendering blog posts');
    const itemElements = items.map(function(item) {
      let element = $(blogPostTemplate);
      element.attr('id', item.id);
      let itemTitle = element.find('.js-blog-item-title');
      itemTitle.text(item.title);
      element.attr('data-checked', item.checked);
      if (item.checked) {
        itemTitle.addClass('blog-item__checked');
      }
      return element
    });
    $('.js-blog-posts').html(itemElements);
  });
}

// function addRecipe(recipe) {
//   console.log('Adding recipe: ' + recipe);
//   $.ajax({
//     method: 'POST',
//     url: RECIPES_URL,
//     data: JSON.stringify(recipe),
//     success: function(data) {
//       getAndDisplayRecipes();
//     },
//     dataType: 'json',
//     contentType: 'application/json'
//   });
// }

function addBlogPostsItem(item) {
  console.log('Adding blog post: ' + item);
  $.ajax({
    method: 'POST',
    url: BLOG_POSTS_URL,
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayBlogPosts();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

// function deleteRecipe(recipeId) {
//   console.log('Deleting recipe `' + recipeId + '`');
//   $.ajax({
//     url: RECIPES_URL + '/' + recipeId,
//     method: 'DELETE',
//     success: getAndDisplayRecipes
//   });
// }

function deleteBlogsPostItem(itemId) {
  console.log('Deleting shopping item `' + itemId + '`');
  $.ajax({
    url: BLOG_POSTS_URL + '/' + itemId,
    method: 'DELETE',
    success: getAndDisplayBlogPosts
  });
}

// function updateRecipe(recipe) {
//   console.log('Updating recipe `' + recipe.id + '`');
//   $.ajax({
//     url: RECIPES_URL + '/' + recipe.id,
//     method: 'PUT',
//     data: recipe,
//     success: function(data) {
//       getAndDisplayRecipes();
//     }
//   });
// }

function updateBlogPostsitem(item) {
  console.log('Updating shopping list item `' + item.id + '`');
  $.ajax({
    url: BLOG_POSTS_URL + '/' + item.id,
    method: 'PUT',
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayBlogPosts()
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}


// function handleRecipeAdd() {
//   $('#js-recipe-form').submit(function(e) {
//     e.preventDefault();
//     var ingredients = $(
//       e.currentTarget).find(
//       '#ingredients-list').val().split(',').map(
//       function(ingredient) { return ingredient.trim() });
//     addRecipe({
//       name: $(e.currentTarget).find('#recipe-name').val(),
//       ingredients: ingredients
//     });
//   });
// }

function handleBlogPostsAdd() {

  $('#js-blog-posts-form').submit(function(e) {
    e.preventDefault();
    addBlogPostsItem({
      name: $(e.currentTarget).find('#js-new-item').val(),
      checked: false
    });
  });

}

// function handleRecipeDelete() {
//   $('.js-recipes').on('click', '.js-recipe-delete', function(e) {
//     e.preventDefault();
//     deleteRecipe(
//       $(e.currentTarget).closest('.js-recipe').attr('id'));
//   });
// }

function handleBlogPostsDelete() {
  $('.js-blog-posts').on('click', '.js-blog-item-delete', function(e) {
    e.preventDefault();
    deleteBlogsPostItem(
      $(e.currentTarget).closest('.js-blog-item').attr('id'));
  });
}

function handleBlogCheckedToggle() {
  $('.js-blog-posts').on('click', '.js-blog-item-toggle', function(e) {
    e.preventDefault();
    var element = $(e.currentTarget).closest('.js-blog-item');

    var item = {
      id: element.attr('id'),
      checked: !JSON.parse(element.attr('data-checked')),
      name: element.find('.js-blog-item-title').text()
    }
    updateBlogPostsitem(item);
  });
}

$(function() {
  getAndDisplayBlogPosts();
  handleBlogPostsAdd();
  handleBlogPostsDelete();
  handleBlogCheckedToggle();
  
});