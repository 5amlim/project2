const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
    {
      content: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, default: 5 },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      userName: String,
      userAvatar: String,
    },
    {
      timestamps: true,
    }
  );

const recipeSchema = new Schema(
    {
        name: String,
        cuisineType: String,
        time: Number,
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

module.exports = mongoose.model("Recipe", recipeSchema);