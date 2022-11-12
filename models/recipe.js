const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// module.exports = {
//   updateOne
// }

const ratingSchema = new Schema(
    {
      content: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, default: 5 },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
      avatar: String,
    },
    {
      timestamps: true,
    }
  );

const recipeSchema = new Schema(
    {
        name: String,
        cuisineType: String,
        userName: String,
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        ingredients: String,
        instructions: String,
        difficulty: String,
        ratings: [ratingSchema]
    },
    {
        timestamps: true,
    }
)

// function updateOne(recipeId, recipe){
//   console.log(recipe)
//   recipeId = parseInt(recipeId)
//   const foundRecipe = recipes.find((recipe) => recipe.recipeId === recipeId)
//   foundRecipe.name = recipe.name
//   foundRecipe.cuisineType = recipe.cuisineType
//   foundRecipe.user = recipe.user
//   foundRecipe.ingredients = recipe.ingredients
//   foundRecipe.instructions = recipe.instructions
//   foundRecipe.difficulty = recipe.difficulty
//   foundRecipe.ratings = recipe.ratings
// }

module.exports = mongoose.model("Recipe", recipeSchema);

