var mongoose = require('mongoose');

var RecipeSchema = mongoose.Schema({
  dishType: String,
  name: String,
  ingredients: [],
  directions: String,
  upvotes: Number,
  downvotes: Number,
  // users: [User]
});

var MealSchema = mongoose.Schema({
  title: String,
  description: String,
  // users: [User],
  recipes: [RecipeSchema]
});

var PartySchema = mongoose.Schema({
  title: String,
  // date: Date,
  description: String,
  meals: [MealSchema]
});

var UserSchema = mongoose.Schema({
  name: String,
  nickname: String,
  email: String,
  password: String,
  parties: [PartySchema]
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Party: mongoose.model('Party', PartySchema),
    Meal: mongoose.model('Meal', MealSchema),
    Recipe: mongoose.model('Recipe', RecipeSchema)
};
