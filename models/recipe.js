const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const recipeSchema = new Schema(
    {
        name: String,
        cuisineType: String,
        time: Number,
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
        ingredients: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
        instructions: String,
        difficulty: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Recipe", recipeSchema);